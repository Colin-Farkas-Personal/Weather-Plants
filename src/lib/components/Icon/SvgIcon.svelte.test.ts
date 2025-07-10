import { describe, expect, test } from 'vitest';
import { getComponentName, transformToTestId } from './SvgIcon.svelte';

describe('<SvgIcon />', () => {
  describe('getComponentName()', () => {
    test('Returns component name for normal path string', () => {
      const pathString = 'src/lib/components/Icons/Bold/MyIconComponent.svelte';
      const componentName = getComponentName(pathString);

      expect(componentName).toBe('MyIconComponent');
    });

    test('Returns empty string for invalid path', () => {
      const pathString = 'invalid/path/to/file';
      const componentName = getComponentName(pathString);

      expect(componentName).toBe('');
    });
    
    test('Returns empty string for non .svelte file path', () => {
      const pathString = 'src/lib/types/type.ts';
      const componentName = getComponentName(pathString);

      expect(componentName).toBe('');
    });
  });

  describe('transformToTestId()', () => {
    test('Transforms component name to kebab-case', () => {
      const parentName = 'MyIconComponent';
      const testId = transformToTestId(parentName);

      expect(testId).toBe('my-icon-component');
    });

    test('Returns empty string for empty component name', () => {
      const parentName = '';
      const testId = transformToTestId(parentName);

      expect(testId).toBe('');
    });
  });
});
