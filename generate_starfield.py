#!/usr/bin/env python3
"""
Generate a realistic deep-space starfield background for web use.
NASA/Hubble inspired minimal astrophotography style.
"""

import random
import math
from PIL import Image, ImageDraw, ImageFilter
import numpy as np


def generate_starfield(width=1920, height=1080, output_path="starfield_background.png"):
    """Generate a realistic deep-space starfield."""

    # Deep space black background with very subtle noise
    base_color = 3
    img_array = np.random.normal(base_color, 1.2, (height, width, 3)).astype(np.float32)
    img_array = np.clip(img_array, 0, 8)

    img = Image.fromarray(img_array.astype(np.uint8), 'RGB')
    draw = ImageDraw.Draw(img)

    # Significantly more stars for realistic density
    total_stars = 12000

    # Distribution of star types
    star_types = [
        # (count_ratio, size_range, brightness_range, color_temp)
        (0.55, (0, 0), (25, 90), 'dim'),         # Tiny distant stars
        (0.25, (0, 0), (70, 150), 'medium'),     # Small visible stars
        (0.12, (0, 1), (120, 200), 'bright'),    # Medium stars
        (0.05, (1, 1), (180, 240), 'bright'),    # Bright stars
        (0.02, (1, 2), (220, 255), 'very_bright'),  # Very bright stars
        (0.01, (2, 2), (245, 255), 'very_bright'),  # Prominent stars
    ]

    def get_star_color(brightness, color_temp):
        """Generate realistic star colors - mostly white with slight blue tint."""
        if color_temp == 'dim':
            # Dim stars: neutral to slightly blue
            r = int(brightness * random.uniform(0.92, 1.0))
            g = int(brightness * random.uniform(0.95, 1.0))
            b = brightness
        elif color_temp == 'medium':
            variation = random.random()
            if variation < 0.6:  # Blue-white
                r = int(brightness * random.uniform(0.88, 0.95))
                g = int(brightness * random.uniform(0.93, 0.98))
                b = brightness
            elif variation < 0.85:  # Pure white
                r = g = b = brightness
            else:  # Slightly warm
                r = brightness
                g = int(brightness * 0.96)
                b = int(brightness * 0.88)
        else:
            # Bright stars: predominantly blue-white
            if random.random() < 0.75:
                r = int(brightness * random.uniform(0.82, 0.92))
                g = int(brightness * random.uniform(0.90, 0.97))
                b = brightness
            else:
                r = brightness
                g = int(brightness * random.uniform(0.94, 1.0))
                b = int(brightness * random.uniform(0.88, 0.98))

        return (min(255, max(0, r)), min(255, max(0, g)), min(255, max(0, b)))

    def draw_star(x, y, size, brightness, color_temp):
        """Draw a single star with optional glow for brighter stars."""
        color = get_star_color(brightness, color_temp)

        if size == 0:
            # Single pixel star - most common
            draw.point((x, y), fill=color)
            # Add subtle cross pattern for brighter single-pixel stars
            if brightness > 140:
                dim = tuple(max(0, int(c * 0.25)) for c in color)
                for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < width and 0 <= ny < height:
                        draw.point((nx, ny), fill=dim)
        elif size == 1:
            # Small star
            draw.point((x, y), fill=color)
            dim_color = tuple(max(0, int(c * 0.4)) for c in color)
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height:
                    draw.point((nx, ny), fill=dim_color)
            # Corner pixels even dimmer
            corner_dim = tuple(max(0, int(c * 0.15)) for c in color)
            for dx, dy in [(-1, -1), (1, -1), (-1, 1), (1, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height:
                    draw.point((nx, ny), fill=corner_dim)
        else:
            # Larger bright stars with soft glow
            # Bright core
            draw.point((x, y), fill=color)
            # Inner ring
            inner = tuple(max(0, int(c * 0.7)) for c in color)
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                draw.point((x + dx, y + dy), fill=inner)
            # Outer glow
            outer = tuple(max(0, int(c * 0.25)) for c in color)
            for dx in range(-2, 3):
                for dy in range(-2, 3):
                    if abs(dx) + abs(dy) >= 2:
                        nx, ny = x + dx, y + dy
                        if 0 <= nx < width and 0 <= ny < height:
                            dist = math.sqrt(dx*dx + dy*dy)
                            fade = max(0, 1 - dist/3)
                            fade_color = tuple(max(0, int(c * fade * 0.2)) for c in color)
                            existing = img.getpixel((nx, ny))
                            blended = tuple(min(255, e + f) for e, f in zip(existing, fade_color))
                            draw.point((nx, ny), fill=blended)

    # Generate main star field
    print("Generating stars...")
    for ratio, size_range, bright_range, color_temp in star_types:
        count = int(total_stars * ratio)
        for _ in range(count):
            x = random.randint(0, width - 1)
            y = random.randint(0, height - 1)
            size = random.randint(*size_range)
            brightness = random.randint(*bright_range)
            draw_star(x, y, size, brightness, color_temp)

    # Add subtle star clusters
    print("Adding subtle star clusters...")
    num_clusters = random.randint(5, 9)
    for _ in range(num_clusters):
        cx = random.randint(50, width - 50)
        cy = random.randint(50, height - 50)
        cluster_radius = random.randint(60, 180)
        cluster_stars = random.randint(80, 200)

        for _ in range(cluster_stars):
            angle = random.uniform(0, 2 * math.pi)
            distance = abs(random.gauss(0, cluster_radius / 2.5))
            x = int(cx + distance * math.cos(angle))
            y = int(cy + distance * math.sin(angle))

            if 0 <= x < width and 0 <= y < height:
                # Cluster stars are dimmer and smaller
                brightness = random.randint(35, 110)
                color = get_star_color(brightness, 'dim')
                draw.point((x, y), fill=color)

    # Add very faint background star haze (distant galaxy simulation)
    print("Adding distant star haze...")
    for _ in range(3000):
        x = random.randint(0, width - 1)
        y = random.randint(0, height - 1)
        brightness = random.randint(8, 25)
        gray = (brightness, brightness, int(brightness * 1.05))
        draw.point((x, y), fill=gray)

    # Create subtle dust structures
    print("Adding subtle dust structures...")
    dust_layer = Image.new('L', (width, height), 0)
    dust_draw = ImageDraw.Draw(dust_layer)

    # Wispy dust lanes
    for _ in range(random.randint(3, 5)):
        points = []
        x = random.randint(-100, width + 100)
        y = random.randint(0, height)
        for _ in range(random.randint(6, 12)):
            points.append((x, y))
            x += random.randint(-150, 150)
            y += random.randint(-80, 80)

        if len(points) >= 2:
            for i in range(len(points) - 1):
                dust_draw.line([points[i], points[i+1]], fill=6, width=random.randint(40, 100))

    dust_layer = dust_layer.filter(ImageFilter.GaussianBlur(radius=60))

    # Apply dust subtly
    img_array = np.array(img).astype(np.float32)
    dust_array = np.array(dust_layer).astype(np.float32)

    for c in range(3):
        img_array[:, :, c] = np.clip(
            img_array[:, :, c] - (dust_array * 0.12),
            0, 255
        )

    img = Image.fromarray(img_array.astype(np.uint8))

    # Very subtle overall depth variation
    print("Adding depth variation...")
    depth = np.zeros((height, width), dtype=np.float32)

    # Create smooth noise for depth
    for scale in [200, 400, 800]:
        noise_h = height // scale + 2
        noise_w = width // scale + 2
        noise = np.random.rand(noise_h, noise_w).astype(np.float32)
        noise_img = Image.fromarray((noise * 255).astype(np.uint8), 'L')
        noise_img = noise_img.resize((width, height), Image.BILINEAR)
        noise_img = noise_img.filter(ImageFilter.GaussianBlur(radius=scale//2))
        depth += np.array(noise_img).astype(np.float32) / 255.0 * (3.0 / scale * 100)

    depth = (depth - depth.min()) / (depth.max() - depth.min()) * 4

    img_array = np.array(img).astype(np.float32)
    for c in range(3):
        img_array[:, :, c] = np.clip(img_array[:, :, c] + depth, 0, 255)

    final_img = Image.fromarray(img_array.astype(np.uint8))

    # Save optimized versions
    print(f"Saving to {output_path}...")
    final_img.save(output_path, 'PNG', optimize=True)

    jpeg_path = output_path.replace('.png', '.jpg')
    final_img.save(jpeg_path, 'JPEG', quality=92, optimize=True)
    print(f"Also saved JPEG version: {jpeg_path}")

    # WebP for modern browsers (best compression)
    webp_path = output_path.replace('.png', '.webp')
    final_img.save(webp_path, 'WEBP', quality=90, method=6)
    print(f"Also saved WebP version: {webp_path}")

    # Report file sizes
    import os
    png_size = os.path.getsize(output_path) / 1024
    jpg_size = os.path.getsize(jpeg_path) / 1024
    webp_size = os.path.getsize(webp_path) / 1024
    print(f"\nFile sizes:")
    print(f"  PNG:  {png_size:.1f} KB")
    print(f"  JPEG: {jpg_size:.1f} KB")
    print(f"  WebP: {webp_size:.1f} KB (recommended for web)")

    return output_path


if __name__ == "__main__":
    generate_starfield(1920, 1080, "starfield_background.png")
    print("\nStarfield generation complete!")
