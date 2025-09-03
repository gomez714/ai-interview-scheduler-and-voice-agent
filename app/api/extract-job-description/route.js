import { NextResponse } from "next/server";
import * as cheerio from 'cheerio';

export async function POST(req) {
  try {
    const { url } = await req.json();
    
    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Fetch the webpage content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      timeout: 10000, // 10 second timeout
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.status} ${response.statusText}` },
        { status: 400 }
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    let jobDescription = '';
    let jobTitle = '';

    // LinkedIn specific selectors
    if (url.includes('linkedin.com')) {
      // Try different LinkedIn selectors for job descriptions
      const linkedinSelectors = [
        '.jobs-box__html-content',
        '.jobs-description__content',
        '.jobs-description-content__text',
        '[data-job-id] .jobs-box__html-content',
        '.job-view-layout .jobs-box__html-content'
      ];

      for (const selector of linkedinSelectors) {
        const content = $(selector).text().trim();
        if (content && content.length > 100) {
          jobDescription = content;
          break;
        }
      }

      // Try to get job title
      const titleSelectors = [
        '.jobs-unified-top-card__job-title',
        '.job-details-jobs-unified-top-card__job-title',
        'h1[data-test-id="job-title"]'
      ];

      for (const selector of titleSelectors) {
        const title = $(selector).text().trim();
        if (title) {
          jobTitle = title;
          break;
        }
      }
    }

    // Generic fallback selectors for other job sites
    if (!jobDescription) {
      const genericSelectors = [
        '[class*="job-description"]',
        '[class*="job-details"]',
        '[class*="description"]',
        '[id*="job-description"]',
        '[id*="description"]',
        'main [class*="content"]',
        '.content',
        'article',
        'main'
      ];

      for (const selector of genericSelectors) {
        const content = $(selector).text().trim();
        if (content && content.length > 200) {
          jobDescription = content;
          break;
        }
      }
    }

    // Generic title extraction
    if (!jobTitle) {
      const titleSelectors = [
        'h1',
        '[class*="job-title"]',
        '[class*="title"]',
        'title'
      ];

      for (const selector of titleSelectors) {
        const title = $(selector).first().text().trim();
        if (title && title.length < 200) {
          jobTitle = title;
          break;
        }
      }
    }

    // Clean up the extracted text
    jobDescription = jobDescription
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim();

    jobTitle = jobTitle
      .replace(/\s+/g, ' ')
      .trim();

    if (!jobDescription || jobDescription.length < 50) {
      return NextResponse.json(
        { error: "Could not extract job description from this URL. The page might require authentication or use dynamic content loading." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      jobDescription,
      jobTitle,
      url
    });

  } catch (error) {
    console.error('Error extracting job description:', error);
    return NextResponse.json(
      { error: "Failed to extract job description. Please try again or paste the content manually." },
      { status: 500 }
    );
  }
}
