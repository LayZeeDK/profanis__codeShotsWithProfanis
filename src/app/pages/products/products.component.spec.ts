import { By } from '@angular/platform-browser';
import {
  createFeatureHarness,
  SpectacularFeatureHarness,
} from '@ngworker/spectacular';
import { productsRoutes } from './products.routes';
/**
 * Routing Component
 */
describe('ProductsComponent', () => {
  let harness: SpectacularFeatureHarness;
  beforeEach(() => {
    harness = createFeatureHarness({
      featurePath: 'products',
      routes: [{ path: 'products', loadChildren: () => productsRoutes }],
    });
  });

  it('should navigate to product details page', async () => {
    // Arrange (query the DOM for the first link)
    const linkItems = harness.rootFixture.debugElement.queryAll(
      By.css('[data-test="products"] a')
    );

    // Act (click the first link)
    linkItems[0].nativeElement.click();

    await harness.rootFixture.whenStable();

    // Assert (check the URL)
    expect(harness.location.path()).toBe('~/1');
  });
});
