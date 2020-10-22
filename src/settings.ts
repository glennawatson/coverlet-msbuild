import * as core from '@actions/core';

export class Inputs {
  public static get projectFiles(): string {
    const result = core.getInput('project-files');

    if (result == null) {
      throw new Error('Did not specify valid project files.');
    }

    return result;
  }

  public static get followSymbolicLinks(): boolean {
    const result = core.getInput('follow-symbolic-links');

    if (result == null) {
      return false;
    }

    return result.toUpperCase() === 'TRUE';
  }

  public static get workingDirectory(): string | undefined {
    const result = core.getInput('working-directory');

    return result === '' || result === null ? undefined : result;
  }

  public static get useSourcelink(): boolean | undefined {
    const result = core.getInput('use-sourcelink');

    if (result == null) {
      return undefined;
    }

    return result.toUpperCase() === 'TRUE';
  }

  public static get excludeFilter(): string | undefined {
    const result = core.getInput('exclude-filter');

    return result === '' || result === null ? undefined : result;
  }

  public static get configuration(): string | undefined {
    const result = core.getInput('configuration');

    return result === '' || result === null ? undefined : result;
  }

  public static get framework(): string | undefined {
    const result = core.getInput('framework');

    return result === '' || result === null ? undefined : result;
  }

  public static get excludeByAttribute(): string | undefined {
    const result = core.getInput('exclude-by-attribute');

    return result === '' || result === null ? undefined : result;
  }

  public static get excludeByFile(): string | undefined {
    const result = core.getInput('exclude-by-file');

    return result === '' || result === null ? undefined : result;
  }

  public static get includeFilter(): string | undefined {
    const result = core.getInput('include-filter');

    return result === '' || result === null ? undefined : result;
  }

  public static get skipAutoProps(): boolean | undefined {
    const result = core.getInput('skip-auto-props');

    if (result == null) {
      return undefined;
    }

    return result.toUpperCase() === 'TRUE';
  }

  public static get noBuild(): boolean | undefined {
    const result = core.getInput('no-build');

    if (result == null) {
      return undefined;
    }

    return result.toUpperCase() === 'TRUE';
  }

  public static get outputFormat(): string | undefined {
    const result = core.getInput('output-format');

    return result === '' || result === null ? undefined : result;
  }

  public static get output(): string | undefined {
    const result = core.getInput('output');

    return result === '' || result === null ? undefined : result;
  }

  public static get mergeWith(): string | undefined {
    const result = core.getInput('merge-with');

    return result === '' || result === null ? undefined : result;
  }

  public static get threshold(): number | undefined {
    const result = core.getInput('threshold');

    if (result === '' || result === null) {
      return undefined;
    }

    return parseInt(result);
  }

  public static get thresholdType(): string | undefined {
    const result = core.getInput('threshold-type');

    return result === '' || result === null ? undefined : result;
  }

  public static get doesNotReturnAttribute(): string | undefined {
    const result = core.getInput('does-not-return-attribute');

    return result === '' || result === null ? undefined : result;
  }
}
