import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('wrapper e2e', () => {
  it('should create wrapper', async (done) => {
    const app = uniq('wrapper');
    ensureNxProject('@nx11-plugin/wrapper', 'dist/packages/wrapper');
    await runNxCommandAsync(`generate @nx11-plugin/wrapper:wrapper ${app}`);

    await runNxCommandAsync(`build ${app}`);
    expect(() => checkFilesExist(`apps/${app}/src/main.ts`)).not.toThrow();
    done();
  });

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('wrapper');
      ensureNxProject('@nx11-plugin/wrapper', 'dist/packages/wrapper');
      await runNxCommandAsync(
        `generate @nx11-plugin/wrapper:wrapper ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
      done();
    });
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('wrapper');
      ensureNxProject('@nx11-plugin/wrapper', 'dist/packages/wrapper');
      await runNxCommandAsync(
        `generate @nx11-plugin/wrapper:wrapper ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      done();
    });
  });
});
