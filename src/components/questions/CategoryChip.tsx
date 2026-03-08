import { cn } from '@/lib/utils';
import type { Category } from '@/hooks/useCategories';

interface CategoryChipProps {
  category: Category;
  isSelected: boolean;
  onSelect: (id: string | undefined) => void;
}

export default function CategoryChip({ category, isSelected, onSelect }: CategoryChipProps) {
  return (
    <button
      onClick={() => onSelect(isSelected ? undefined : category.id)}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border',
        isSelected
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-card text-foreground border-border hover:border-primary/40'
      )}
    >
      <span>{category.name}</span>
      {category.name_ar && (
        <span className="text-xs opacity-70 font-display">{category.name_ar}</span>
      )}
    </button>
  );
}
