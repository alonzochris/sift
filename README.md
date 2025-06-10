### **Goal"**
To build the "Google Search" for our client intelligence—a tool that is fast, powerful, and perfectly categorized, automatically guiding our advertisers' attention to what is most important.

### **Core User Experience (UX)**

The application is built around a simple and intuitive two-section navigation: `Clients` and `Search`.

1.  A user first lands on the **`Clients`** dashboard to get a high-level, "at-a-glance" overview of all their accounts.
2.  From there, they can click into a specific client to access the **`Client Deep-Dive`** page for detailed thematic analysis.
3.  Alternatively, a user can navigate to the **`Search`** page at any time to perform a targeted keyword search across all clients and sources.

---
### **The Final MVP Feature Set**

This is the focused list of features we will build.

#### **Section A: The `Clients` Dashboard**

This is the application's homepage, designed for quick overviews.

* **Feature 1: The Client Card Dashboard**
    * The UI will be a grid of "Client Cards," one for each client we track.
    * **Each card will display four crucial, automatically calculated metrics:**
        1.  **Client Name** (e.g., Airbyte)
        2.  **Total Mentions** (A raw count from the last 30 days)
        3.  **Mention Trend** (A simple sparkline chart and percentage showing momentum)
        4.  **Overall Keyword-Based Sentiment** (A non-AI ratio based on keyword matching, e.g., `🙂 32 Positive / 🙁 13 Negative`)

#### **Section B: The `Client Deep-Dive` Page**

This page is for deep analysis of a single client, accessed by clicking a Client Card.

* **Feature 2: Thematic Category Sidebar**
    * On the left side of the page, all alerts for the selected client will be automatically categorized into themes using rule-based keyword matching (e.g., `🔥 Hot Discussions`, `😡 Pain & Frustrations`, `💡 Ideas & Opportunities`, `📰 General News`).
    * Each theme will display a **dynamic "facet" count** of the number of alerts within it.

* **Feature 3: Cost-Effective AI Category Summaries**
    * When a user clicks on a theme (e.g., `😡 Pain & Frustrations`), the main content area will display a concise, AI-generated paragraph summarizing all the alerts within that category. This uses only **one AI call per category**, making it powerful yet affordable.

* **Feature 4: The Ranked "Supporting Evidence" Feed**
    * Below the AI summary, the individual alerts for that theme will be listed, sorted by a calculated **"Importance Score"** to show the most critical items first.
    * **The ranking will be based on:**
        1.  **Source Authority:** A mention from a major news site will be ranked higher than a forum comment.
        2.  **Keyword Severity:** An alert containing "outage" will be ranked higher than one containing "confusing."
        3.  **AI-Identified "Top 3":** The top 3 most critical alerts, as identified by the AI during the summary generation, will be pinned to the top with a `🔥 Top Topic` badge.

#### **Section C: The `Search` Page**

A clean, powerful, and fast utility for targeted information retrieval.

* **Feature 5: Dedicated Search UI**
    * A simple interface with a large central **keyword search bar**, a **dropdown menu to filter by one or more clients**, and an optional **dropdown to filter by source** (e.g., Reddit, Podcast).

* **Feature 6: High-Performance Search Backend**
    * To ensure "Google-fast" results, the backend will use a **PostgreSQL Full-Text Search Index**. This allows the app to search instantly across hundreds of thousands of alerts without any lag.

---
### **Final Technical Stack**

* **Architecture:** Serverless, Monorepo
* **Frontend:** Next.js 15 (App Router), React, TypeScript, TailwindCSS
* **Backend API:** Node.js/TypeScript via Next.js API Routes
* **Database:** Serverless PostgreSQL provided by **Neon**
* **ORM:** **Drizzle ORM**
* **Deployment:** **Vercel**# sift
