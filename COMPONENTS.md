# Nucleus Component System

## 📦 Overview

Nucleus uses a standardized component system for consistency, reusability, and faster development.

## 🎯 Component Categories

### 1. **UI Components** (`/components/ui/`)
Reusable, styled components used throughout the app.

### 2. **Feature Components** (`/app/(authenticated)/[module]/components/`)
Module-specific components (e.g., pantry-specific, hunting-specific).

### 3. **Layout Components**
- `Header.tsx` - App header with tabs, search, profile
- `(authenticated)/layout.tsx` - Dashboard layout with sidebar

## 📚 Standard Components

### StatCard
```tsx
<StatCard 
  label="Total Items" 
  value={42}
  icon={Package}
  variant="success"
/>
```

### PageHeader
```tsx
<PageHeader
  title="Page Title"
  description="Page description"
  actionLabel="Add Item"
  onAction={handleAdd}
/>
```

### ResponsiveTable
```tsx
<ResponsiveTable
  data={items}
  columns={columns}
  mobileCard={(item) => <MobileCard item={item} />}
/>
```

### ActionButton
```tsx
<ActionButton variant="primary" icon={Save} onClick={handleSave}>
  Save Changes
</ActionButton>
```

### Badge
```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Low Stock</Badge>
```

### Card
```tsx
<Card>
  <CardHeader>Header</CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### InfoBanner
```tsx
<InfoBanner variant="warning" icon={AlertCircle}>
  Important information here
</InfoBanner>
```

### EmptyState
```tsx
<EmptyState
  icon={Package}
  title="No items"
  description="Add your first item"
/>
```

## 🎨 Design Tokens

### Colors
- **Primary**: `#2563EB` (Cobalt Blue)
- **Slate**: `#1E293B` (Deep Slate)

### Variants
- `default` - Neutral gray
- `primary` - Brand blue
- `success` - Green (positive)
- `warning` - Yellow (caution)
- `danger` - Red (destructive)
- `info` - Blue (informational)

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px

## 📱 Mobile-First Patterns

### Responsive Grids
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
  {/* Content */}
</div>
```

### Responsive Buttons
```tsx
<button className="w-full sm:w-auto px-4 py-3">
  Button
</button>
```

### Tables → Cards on Mobile
```tsx
<ResponsiveTable
  data={data}
  columns={desktopColumns}
  mobileCard={(item) => <ItemCard item={item} />}
/>
```

## 🏗️ Page Structure Template

```tsx
export default function MyPage() {
  return (
    <div>
      {/* 1. Header */}
      <PageHeader 
        title="Page Title" 
        actionLabel="Add Item"
      />

      {/* 2. Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <StatCard label="Stat 1" value={100} />
        <StatCard label="Stat 2" value={75} variant="success" />
      </div>

      {/* 3. Info/Filters (optional) */}
      <InfoBanner variant="info" className="mb-6">
        Helpful information
      </InfoBanner>

      {/* 4. Main Content */}
      <ResponsiveTable 
        data={items}
        columns={columns}
        mobileCard={renderCard}
      />
    </div>
  )
}
```

## ✅ Benefits

1. **Consistency**: Same look and feel everywhere
2. **Speed**: Build pages faster with pre-made components
3. **Maintainability**: Update once, changes everywhere
4. **Mobile-First**: Built-in responsive behavior
5. **Accessibility**: Touch-friendly, proper contrast
6. **Type Safety**: Full TypeScript support

## 🔄 Migration Pattern

**Before:**
```tsx
<div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
  <p className="text-slate-400 text-sm">Total Items</p>
  <p className="text-2xl font-bold text-white">{count}</p>
</div>
```

**After:**
```tsx
<StatCard label="Total Items" value={count} />
```

Much cleaner and consistent! 🎉

