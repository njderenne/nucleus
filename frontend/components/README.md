# Nucleus UI Components

Reusable components for consistent design across the Nucleus app.

## 🎨 Component Library

### Import

```typescript
import { 
  StatCard, 
  PageHeader, 
  EmptyState, 
  ActionButton, 
  Badge, 
  Card,
  InfoBanner,
  ResponsiveTable 
} from '@/components/ui'
```

---

## 📊 StatCard

Display key metrics and statistics.

### Props
- `label`: string - Stat label
- `value`: string | number - Main value
- `subtext?`: string - Additional info
- `icon?`: LucideIcon - Optional icon
- `variant?`: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'

### Example
```tsx
<StatCard 
  label="Total Items" 
  value={42}
  subtext="5 expiring soon"
  icon={Package}
  variant="success"
/>
```

---

## 📄 PageHeader

Standardized page header with title and action button.

### Props
- `title`: string - Page title
- `description?`: string - Subtitle
- `actionLabel?`: string - Button text
- `actionIcon?`: LucideIcon - Button icon (default: Plus)
- `onAction?`: () => void - Button click handler
- `children?`: ReactNode - Custom actions

### Example
```tsx
<PageHeader
  title="Pantry Inventory"
  description="Track your food items"
  actionLabel="Add Item"
  onAction={() => console.log('Add')}
/>
```

---

## 🔘 ActionButton

Consistent button component with variants.

### Props
- `variant?`: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost'
- `size?`: 'sm' | 'md' | 'lg'
- `icon?`: LucideIcon
- `fullWidth?`: boolean
- `disabled?`: boolean

### Example
```tsx
<ActionButton 
  variant="success" 
  icon={Check}
  onClick={handleSave}
>
  Save Changes
</ActionButton>
```

---

## 🏷️ Badge

Small labels and tags.

### Props
- `variant?`: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
- `size?`: 'sm' | 'md' | 'lg'

### Example
```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Expiring</Badge>
```

---

## 📦 Card

Container component with variants.

### Props
- `variant?`: 'default' | 'bordered' | 'elevated'
- `padding?`: 'none' | 'sm' | 'md' | 'lg'

### Example
```tsx
<Card variant="elevated" padding="lg">
  <CardHeader>
    <h3>Card Title</h3>
  </CardHeader>
  <CardContent>
    Card content here
  </CardContent>
</Card>
```

---

## 💡 InfoBanner

Contextual information banners.

### Props
- `icon?`: LucideIcon
- `title?`: string
- `variant?`: 'info' | 'success' | 'warning' | 'danger'

### Example
```tsx
<InfoBanner 
  icon={AlertCircle}
  variant="warning"
  title="Action Required"
>
  Please update your settings.
</InfoBanner>
```

---

## 📱 ResponsiveTable

Powerful table with mobile card fallback.

### Props
- `data`: T[] - Array of data
- `columns`: ColumnDef<T>[] - TanStack Table columns
- `mobileCard?`: (item: T) => ReactNode - Mobile card renderer
- `searchable?`: boolean - Enable search (default: true)
- `pagination?`: boolean - Enable pagination (default: true)
- `pageSize?`: number - Items per page (default: 10)
- `emptyState?`: ReactNode - Custom empty state

### Example
```tsx
const columns: ColumnDef<Item>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ getValue }) => (
      <span className="text-white">{getValue()}</span>
    ),
  },
  // ... more columns
]

<ResponsiveTable
  data={items}
  columns={columns}
  mobileCard={(item) => <ItemCard item={item} />}
  pagination={true}
  pageSize={10}
/>
```

### Mobile vs Desktop
- **Mobile**: Shows custom card layout
- **Desktop**: Shows sortable table
- Automatically switches at `md` breakpoint (768px)

---

## 🎭 EmptyState

Consistent empty state displays.

### Props
- `icon?`: LucideIcon
- `title`: string
- `description?`: string
- `action?`: { label: string, onClick: () => void }

### Example
```tsx
<EmptyState
  icon={Package}
  title="No items found"
  description="Get started by adding your first item"
  action={{
    label: "Add Item",
    onClick: handleAdd
  }}
/>
```

---

## 🎨 Color Variants

All components use consistent color variants:

- **default**: Slate gray
- **primary**: Cobalt blue (#2563EB)
- **success**: Green (positive actions)
- **warning**: Yellow (caution)
- **danger**: Red (destructive actions)
- **info**: Blue (informational)

---

## 📱 Mobile-First Design

All components are:
- ✅ Touch-friendly (44px+ tap targets)
- ✅ Responsive breakpoints (sm, md, lg)
- ✅ Stack on mobile, grid on desktop
- ✅ Optimized padding and spacing
- ✅ Full-width buttons on mobile

---

## 🚀 Usage Pattern

```tsx
import { PageHeader, StatCard, ResponsiveTable } from '@/components/ui'

export default function MyPage() {
  return (
    <div>
      {/* Standard page structure */}
      <PageHeader 
        title="My Page" 
        actionLabel="Add Item" 
      />

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <StatCard label="Total" value={100} />
        <StatCard label="Active" value={75} variant="success" />
      </div>

      {/* Content */}
      <ResponsiveTable data={data} columns={columns} />
    </div>
  )
}
```

This pattern ensures consistency across all pages!

