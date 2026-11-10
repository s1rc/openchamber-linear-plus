import {
  mountBadge, mountBanner, mountButton, mountCheckbox, mountEmpty, mountList, mountMenu, mountProgress, mountSearchField,
  mountSelect, mountSpinner, mountSwitch, mountTabs, mountTextField,
  type BadgeProps, type BannerProps, type ButtonProps, type CheckboxProps, type EmptyProps, type ListProps, type MenuProps,
  type ProgressProps,
  type SearchFieldProps, type SelectProps, type SpinnerProps, type TabsProps, type TextFieldProps,
} from '@openchamber/sdk/ui';
import { useKit, type Mount } from '@openchamber-ext/shared-ui/preact';

const wrap = <P,>(mount: Mount<P>, display: 'inline-flex' | 'block' = 'inline-flex') => (props: P) => {
  const ref = useKit(mount, props);
  return <span ref={ref} style={{ display }} />;
};

export const Button = wrap<ButtonProps>(mountButton);
export const Select = wrap<SelectProps>(mountSelect);
export const TextField = wrap<TextFieldProps>(mountTextField, 'block');
export const SearchField = wrap<SearchFieldProps>(mountSearchField, 'block');
export const Tabs = wrap<TabsProps>(mountTabs);
export const Menu = wrap<MenuProps>(mountMenu);
export const Badge = wrap<BadgeProps>(mountBadge);
export const Spinner = wrap<SpinnerProps>(mountSpinner);
export const Banner = wrap<BannerProps>(mountBanner, 'block');
export const Empty = wrap<EmptyProps>(mountEmpty, 'block');
export const Progress = wrap<ProgressProps>(mountProgress, 'block');
export const List = wrap<ListProps>(mountList, 'block');
export const Checkbox = wrap<CheckboxProps>(mountCheckbox);
export const Switch = wrap<CheckboxProps>(mountSwitch);
/** Full-width variants: a switch with its label at the left and the switch at the right, a select that fills its row. */
export const SwitchBlock = wrap<CheckboxProps>(mountSwitch, 'block');
export const SelectBlock = wrap<SelectProps>(mountSelect, 'block');
