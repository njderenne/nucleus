from typing import List, Optional, Dict
from langchain.chat_models import ChatOpenAI
from langchain.embeddings import OpenAIEmbeddings
from langchain.schema import HumanMessage, SystemMessage
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from app.core.config import settings
import uuid

class AIClient:
    """Centralized AI client for OpenAI and Qdrant operations."""
    
    def __init__(self):
        self.openai_api_key = settings.OPENAI_API_KEY
        self.qdrant_url = settings.QDRANT_URL
        
        if self.openai_api_key:
            self.llm = ChatOpenAI(
                openai_api_key=self.openai_api_key,
                model_name="gpt-4-turbo-preview",
                temperature=0.7
            )
            self.embeddings = OpenAIEmbeddings(openai_api_key=self.openai_api_key)
        else:
            self.llm = None
            self.embeddings = None
        
        self.qdrant_client = QdrantClient(url=self.qdrant_url)
        self._ensure_collection()
    
    def _ensure_collection(self):
        """Ensure the Qdrant collection exists."""
        try:
            collections = self.qdrant_client.get_collections()
            collection_names = [c.name for c in collections.collections]
            
            if settings.QDRANT_COLLECTION_NAME not in collection_names:
                self.qdrant_client.create_collection(
                    collection_name=settings.QDRANT_COLLECTION_NAME,
                    vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
                )
        except Exception as e:
            print(f"Error ensuring Qdrant collection: {e}")
    
    async def generate_summary(self, content: str, context: str = "") -> Optional[str]:
        """Generate an AI summary of the given content."""
        if not self.llm:
            return None
        
        system_prompt = f"You are a helpful AI assistant for Nucleus, a life operating system. {context}"
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=f"Please provide a concise summary of the following:\n\n{content}")
        ]
        
        try:
            response = await self.llm.agenerate([messages])
            return response.generations[0][0].text
        except Exception as e:
            print(f"Error generating summary: {e}")
            return None
    
    async def chat(self, user_message: str, system_context: str = "", user_id: str = None) -> Optional[str]:
        """Have a conversation with the AI assistant."""
        if not self.llm:
            return "AI services are not configured."
        
        # Retrieve relevant context from vector memory
        relevant_context = await self.retrieve_context(user_message, user_id)
        
        context_str = "\n".join(relevant_context) if relevant_context else ""
        full_context = f"{system_context}\n\nRelevant context:\n{context_str}" if context_str else system_context
        
        messages = [
            SystemMessage(content=f"You are Nucleus AI, an intelligent assistant that helps manage the user's life. {full_context}"),
            HumanMessage(content=user_message)
        ]
        
        try:
            response = await self.llm.agenerate([messages])
            answer = response.generations[0][0].text
            
            # Store the interaction in vector memory
            if user_id:
                await self.store_memory(f"User: {user_message}\nAssistant: {answer}", user_id)
            
            return answer
        except Exception as e:
            print(f"Error in chat: {e}")
            return "I apologize, but I encountered an error processing your request."
    
    async def store_memory(self, content: str, user_id: str, metadata: Optional[Dict] = None):
        """Store content in vector memory for later retrieval."""
        if not self.embeddings:
            return
        
        try:
            embedding = await self.embeddings.aembed_query(content)
            
            payload = {
                "content": content,
                "user_id": user_id,
                "timestamp": str(uuid.uuid4()),
                **(metadata or {})
            }
            
            point = PointStruct(
                id=str(uuid.uuid4()),
                vector=embedding,
                payload=payload
            )
            
            self.qdrant_client.upsert(
                collection_name=settings.QDRANT_COLLECTION_NAME,
                points=[point]
            )
        except Exception as e:
            print(f"Error storing memory: {e}")
    
    async def retrieve_context(self, query: str, user_id: Optional[str] = None, limit: int = 5) -> List[str]:
        """Retrieve relevant context from vector memory."""
        if not self.embeddings:
            return []
        
        try:
            query_embedding = await self.embeddings.aembed_query(query)
            
            search_filter = None
            if user_id:
                search_filter = {"must": [{"key": "user_id", "match": {"value": user_id}}]}
            
            results = self.qdrant_client.search(
                collection_name=settings.QDRANT_COLLECTION_NAME,
                query_vector=query_embedding,
                limit=limit,
                query_filter=search_filter
            )
            
            return [result.payload.get("content", "") for result in results]
        except Exception as e:
            print(f"Error retrieving context: {e}")
            return []

# Global AI client instance
ai_client = AIClient()

