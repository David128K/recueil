import { Stack, TextInput } from '@sanity/ui';
import { set } from 'sanity';
import { StringInputProps } from 'sanity';

type IngredientValue = {
  amount: string;
  unit: string;
  name: string;
};

export function IngredientInput(props: StringInputProps) {
  const { value, onChange } = props;
  
  // Parse the value (can be undefined or an object)
  const ingredient: IngredientValue = typeof value === 'object' && value !== null
    ? (value as IngredientValue)
    : { amount: '', unit: '', name: '' };

  const handleChange = (field: keyof IngredientValue, fieldValue: string) => {
    const newValue = {
      ...ingredient,
      [field]: fieldValue,
    };
    
    // Always set the value, even if fields are empty
    onChange(set(newValue));
  };

  return (
    <Stack space={2}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <TextInput
          value={ingredient.amount || ''}
          onChange={(event) => handleChange('amount', event.currentTarget.value)}
          placeholder="Menge"
          style={{ flex: '0 0 100px' }}
        />
        <TextInput
          value={ingredient.unit || ''}
          onChange={(event) => handleChange('unit', event.currentTarget.value)}
          placeholder="Einheit (optional)"
          style={{ flex: '0 0 120px' }}
        />
        <TextInput
          value={ingredient.name || ''}
          onChange={(event) => handleChange('name', event.currentTarget.value)}
          placeholder="Name"
          style={{ flex: '1' }}
        />
      </div>
    </Stack>
  );
}
