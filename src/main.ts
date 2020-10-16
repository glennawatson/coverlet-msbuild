import * as core from '@actions/core';
import * as glob from '@actions/glob';
import {exec} from '@actions/exec';
import {Inputs} from './settings';

async function run(): Promise<void> {
  try {
    const globOptions = {
      followSymbolicLinks: Inputs.followSymbolicLinks
    };

    const globber = await glob.create(Inputs.projectFiles, globOptions);

    const defaultArgs = ['test', '/p:CollectCoverage=true'];

    if (Inputs.noBuild) {
      defaultArgs.push('--no-build');
    }

    if (Inputs.useSourcelink) {
      defaultArgs.push(`/p:UseSourceLink=${Inputs.useSourcelink}`);
    }

    if (Inputs.excludeFilter) {
      defaultArgs.push(`/p:Exclude="${Inputs.excludeFilter}"`);
    }

    if (Inputs.excludeByAttribute) {
      defaultArgs.push(
        `/p:p:ExcludeByAttribute="${Inputs.excludeByAttribute}"`
      );
    }

    if (Inputs.excludeByFile) {
      defaultArgs.push(`/p:p:ExcludeByAttribute="${Inputs.excludeByFile}"`);
    }

    if (Inputs.includeFilter) {
      defaultArgs.push(`/p:Include="${Inputs.includeFilter}"`);
    }

    if (Inputs.skipAutoProps) {
      defaultArgs.push(`/p:SkipAutoProps=${Inputs.skipAutoProps}`);
    }

    if (Inputs.threshold) {
      defaultArgs.push(`/p:Threshold=${Inputs.threshold}`);
    }

    if (Inputs.thresholdType) {
      defaultArgs.push(`/p:ThresholdType=${Inputs.thresholdType}`);
    }

    if (Inputs.doesNotReturnAttribute) {
      defaultArgs.push(
        `/p:DoesNotReturnAttribute="${Inputs.doesNotReturnAttribute}"`
      );
    }

    if (Inputs.output) {
      defaultArgs.push(`/p:CoverletOutput="${Inputs.output}"`);
    }

    const files = new Array<string>();

    for await (const file of globber.globGenerator()) {
      files.push(file);
    }

    for (let i = 0; i < files.length; ++i) {
      const runArgs = [...defaultArgs];
      const currentFile = files[i];

      if (Inputs.mergeWith) {
        if (i !== 0) {
          runArgs.push(`/p:MergeWith="${Inputs.mergeWith}"`);
        }
      }

      if (Inputs.mergeWith === undefined || i === files.length - 1) {
        if (Inputs.outputFormat) {
          runArgs.push(`/p:CoverletOutputFormat=${Inputs.outputFormat}`);
        }
      }

      runArgs.push(currentFile);

      await exec('dotnet', runArgs);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
