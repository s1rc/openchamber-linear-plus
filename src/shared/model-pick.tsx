// The model for one Start plan or Start build, beside its other options. It starts on "From Settings", which
// is whatever Settings gives this folder (its own, else every folder's), and a pick applies to this start only.
import { useQuery } from './cache.ts';
import { fetchChoices } from './choices.ts';
import { currentModelLabel, DEFAULT_ID } from './choices-rules.ts';
import { Select } from './kit.tsx';

type Props = {
  role: 'plan' | 'build';
  /** The folder the session starts in: Settings are read for it. */
  directory: string | null;
  /** `provider/model`, or empty for the Settings choice. */
  value: string;
  onChange: (model: string) => void;
  disabled?: boolean;
};

/** Nothing when the service cannot list models: the start then uses Settings, as before. */
export const ModelPick = ({ role, directory, value, onChange, disabled }: Props) => {
  const choices = useQuery(`start-choices:${directory ?? ''}`, () => fetchChoices(directory));
  if (!choices.data) return null;
  const options = [{ id: DEFAULT_ID, label: `From Settings: ${currentModelLabel(choices.data, role)}` }, ...choices.data.models];
  return (
    <div class="lin-model-pick">
      <Select
        label={role === 'plan' ? 'Plan model' : 'Build model'}
        value={value || DEFAULT_ID}
        options={options}
        searchable
        searchPlaceholder="Search models"
        disabled={disabled}
        onChange={(id) => onChange(id === DEFAULT_ID ? '' : id)}
      />
    </div>
  );
};
