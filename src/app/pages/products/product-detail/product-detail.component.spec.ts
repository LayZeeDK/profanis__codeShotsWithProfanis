import { fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  createFeatureHarness,
  SpectacularFeatureHarness,
} from '@ngworker/spectacular';
import { productsRoutes } from '../products.routes';

/**
 * Routed Component
 */
describe('ProductDetailComponent', () => {
  let harness: SpectacularFeatureHarness;
  beforeEach(() => {
    harness = createFeatureHarness({
      featurePath: 'products',
      routes: [{ path: 'products', loadChildren: () => productsRoutes }],
    });
  });

  it('should have the correct productId from the route', async () => {
    // Arrange (navigate to the product detail page)
    await harness.router.navigate(['~', '1']);

    // Act

    // Assert (check the productId)
    const productId = harness.rootFixture.debugElement.query(
      By.css('[data-test="product-id"]')
    ).nativeElement;
    expect(productId.textContent.trim()).toBe('1');
  });

  it('should navigate back to products list if the provided productId is wrong', async () => {
    // Arrange (navigate to the product detail page with an invalid productId)
    await harness.router.navigate(['~', '100']);

    // Assert (check the URL)
    expect(harness.location.path()).toBe('~/');
  });

  it('should click back to products and go to the list', fakeAsync(async () => {
    // Arrange (navigate to the product detail page)
    await harness.router.navigate(['~', '1']);

    // Act (click the back to products button)
    const element = harness.rootFixture.debugElement.query(
      By.css('[data-test="back-to-products"]')
    );
    element.triggerEventHandler('click');
    await harness.rootFixture.whenStable();

    // Assert (check the URL)
    expect(harness.location.path()).toBe('~/');
  }));
});
