import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { Provider } from '@angular/core';

/**
 * This function provides a custom image loader that allows us to request images with different options.
 */
export function provideOptimizedImageLoader() {
  const providers: Provider[] = [
    { provide: IMAGE_LOADER, useValue: imageLoaderFn },
  ];
  return providers;
}

function imageLoaderFn(config: ImageLoaderConfig) {
  // Movie's Poster Url Sample:
  // https://m.media-amazon.com/images/M/MV5BNThmZGY4NzgtMTM4OC00NzNkLWEwNmEtMjdhMGY5YTc1NDE4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg
  // The URL is composed of the following parts:
  // - Base URL: https://m.media-amazon.com/images/
  // - Path: MV5BNThmZGY4NzgtMTM4OC00NzNkLWEwNmEtMjdhMGY5YTc1NDE4XkEyXkFqcGdeQXVyMTQxNzMzNDI@
  // - Default Options: _V1_
  // - Extension: .jpg
  // We can build a custom image loader that allows us to request images with different options.
  // Taking into account how Amazon's image hosting works, we can request images with different options by adding them to the URL.
  // @see also https://stackoverflow.com/questions/73089650/what-are-the-parameters-for-aws-media-amazon-image-hosting

  // If the image source is not provided, we return an empty string.
  if (!config.src) {
    return '';
  }

  // Parse the URL to extract the origin, path, and extension.
  const url = new URL(config.src);

  // If the image is not hosted in Amazon's servers, we return the original URL.
  if (url.origin !== 'https://m.media-amazon.com') {
    return config.src;
  }

  // Extract the path, default options, and extension from the URL.
  const [path, currentOpt, ext] = url.pathname.split('.');
  const extraOpts: string[] = [];

  // Add the requested options to the list of options.
  if (config.width) {
    extraOpts.push(`SX${config.width}`);
  }

  // When requesting a placeholder image we ask a low quality image to reduce the load time.
  if (config.isPlaceholder) {
    extraOpts.push('QL20');
  }

  // This setting is used to request the image in WebP format.
  extraOpts.push('FMwebp');

  // Return the new URL with the requested options.
  return `${url.origin}/${path}.${currentOpt}${extraOpts.join('_')}.${ext}`;
}
