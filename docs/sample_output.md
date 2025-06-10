### This is a how to call the Syften API and the sample output

```
# Get all
curl -X POST -H "Authorization: Bearer $SYFTEN_APITOKEN" -H "Content-length: 0" https://syften.com/api/0.0/items/get
```

```
[
  {
    "id": "703b9a1f-d139-47f5-8df5-906bc8583496",
    "item": {
      "backend": "Bluesky",
      "type": "post",
      "icon_url": "https://docs.bsky.app/img/favicon.png",
      "timestamp": "2025-06-10T12:27:24Z",
      "item_url": "https://bsky.app/profile/jobboardsearch.com/post/3lravcuuixm2x",
      "author": "jobboardsearch.com (JobBoardSearch 🔎)",
      "text": "📢 Blokchain Talent is #hiring a Senior Devops Engineer!\n\n🌎 Tempe, Arizona, United States\r\n👵 Senior\n\n\n🔗 http://jbs.ink/pSg1Byxni2sh\n\n#jobalert #jobsearch #devopsjobs #backend #aws #kubernetes #mysql #devops #redis #design\n\n[contains embedded media]",
      "title": "Bluesky post by jobboardsearch.com (JobBoardSearch 🔎)",
      "title_type": 2,
      "meta": {}
    },
    "matched_on": "2025-06-10T12:27:38.085641Z",
    "filter": "redis tag:int-redis-news lang:en",
    "email_sent": false,
    "email_dont_send": false
  },
  {
    "id": "47e3e3a9-b363-474e-a15f-f27a33c9bad9",
    "item": {
      "backend": "Podcast",
      "backend_sub": "ep_9lmar2q8n3yvr2nw",
      "type": "podcast",
      "icon_url": "https://syften.com/static/imgs/logos/podcast-64.png",
      "timestamp": "2025-06-10T12:00:00Z",
      "item_url": "https://share.transistor.fm/s/e84b136b",
      "author": "Mostly Technical",
      "text": "<p>Ian and Aaron talk about Ian’s new love of Codex, what happened after “panic mode”, Aaron’s weekend with the guys, and more.</p><p>Sponsored by <a href=\"https://bentonow.com/\"><strong>Bento</strong></a>, <a href=\"https://workos.com/\"><strong>WorkOS</strong></a>, <a href=\"https://nativephp.com/mobile\"><strong>NativePHP for Mobile</strong></a>, <a href=\"https://forwardmx.net/\"><strong>ForwardMX</strong></a>, and <a href=\"https://lrvl.co/mostly\"><strong>Laracon US 2025</strong></a></p><p>Interested in sponsoring Mostly Technical?  Head to <a href=\"https://mostlytechnical.com/sponsor\"><strong>https://mostlytechnical.com/sponsor</strong></a> to learn more.</p><p></p><ul><li>(00:00) - Table Captaining</li>\n<li>(11:49) - Ads Work!</li>\n<li>(13:42) - Panic Mode Update</li>\n<li>(27:48) - Make It Recurring</li>\n<li>(35:12) - Irons In The Fire </li>\n<li>(42:20) - Ian ❤️ Codex</li>\n<li>(54:58) - Aaron's Weekend With Humanity</li>\n<li>(01:07:01) - The Ultimate Satisficer</li>\n</ul><br>Links:<ul><li><a href=\"https://www.caesars.com/paris-las-vegas/restaurants/the-bedford-by-martha-stewart\">The Bedford by Martha Stewart</a></li><li><a href=\"https://bsky.app/profile/justinjackson.ca/post/3lqsyai327s2h\">Justin Jackson's Bluesky post about ads working</a></li><li><a href=\"https://openai.com/index/introducing-codex/\">OpenAI's Codex</a></li><li><a href=\"https://texashillcountry.com/\">Texas Hill Country</a></li></ul>\n--+--\n[00:00:07.380 --> 00:00:35.530] You're listening to Mostly",
      "title": "86: Focus Hard",
      "title_type": 0,
      "meta": {},
      "lang": "en"
    },
    "matched_on": "2025-06-10T12:09:57.574424Z",
    "filter": "redis tag:int-redis-news lang:en",
    "email_sent": false,
    "email_dont_send": false
  },
  {
    "id": "548d8fd2-485c-4c03-a13b-4759cc61888e",
    "item": {
      "backend": "Reddit",
      "backend_sub": "r/dataengineering",
      "type": "comment",
      "icon_url": "https://www.redditstatic.com/shreddit/assets/favicon/192x192.png",
      "timestamp": "2025-06-10T12:03:25Z",
      "item_url": "https://www.reddit.com/r/dataengineering/comments/1l7oij7/airflow_for_ingestion_and_control_m_for/mx0389g/",
      "author": "DoNotFeedTheSnakes",
      "text": "They don't do the same thing\nYou can use Airflow operators out of the box, sure.\nBut you can also use Airflow to orchestrate code that uses the Airbyte connectors to integrate data.\nHonestly I'm a little confused when you say Airflow is used to integrate. Does it not have DAGs that run on a schedule?",
      "title": "Airflow For Ingestion And Control M For",
      "title_type": 0,
      "meta": {},
      "lang": "en"
    },
    "matched_on": "2025-06-10T12:04:28.880873Z",
    "filter": "airbyte tag:int-airbyte-news NOT site:backlinks.slack.com NOT site:airbytehq.slack.com",
    "email_sent": false,
    "email_dont_send": false
  },
  {
    "id": "370e50e5-2034-4360-94f7-b8a133df2d6a",
    "item": {
      "backend": "Podcast",
      "backend_sub": "ep_eb98jyg2pm2ljmga",
      "type": "podcast",
      "icon_url": "https://syften.com/static/imgs/logos/podcast-64.png",
      "timestamp": "2025-06-10T09:00:00Z",
      "item_url": "https://softwareengineeringdaily.com/2025/06/10/the-challenge-of-ai-model-evaluations-with-ankur-goyal/",
      "author": "Software Engineering Daily",
      "text": "Evaluations are critical for assessing the quality, performance, and effectiveness of software during development. Common evaluation methods include code reviews and automated testing, and can help identify bugs, ensure compliance with requirements, and measure software reliability.\n\n\n\nHowever, evaluating LLMs presents unique challenges due to their complexity, versatility, and potential for unpredictable behavior.\n\n\n\nAnkur Goyal is the CEO and Founder of Braintrust Data, which provides an end-to-end platform for AI application development, and has a focus on making LLM development robust and iterative. Ankur previously founded Impira which was acquired by Figma, and he later ran the AI team at Figma. Ankur joins the show to talk about Braintrust and the unique challenges of developing evaluations in a non-deterministic context.\n\n\n\nSean's been an academic, startup founder, and Googler. He has published works covering a wide range of topics from AI to quantum computing. Currently, Sean is an AI Entrepreneur in Residence at Confluent where he works on AI strategy and thought leadership. You can connect with Sean on LinkedIn.\n\n \n\nPlease click here to see the transcript of this episode.\n\nSponsorship inquiries: sponsor@softwareengineeringdaily.com\n--+--\n[00:00:00.110 --> 00:00:27.110] Evaluations are critical for assessing the quality, performance, and effectiveness of software during development. Common evaluation methods include code reviews and automated testing, and can help ",
      "title": "The Challenge of AI Model Evaluations with Ankur Goyal",
      "title_type": 0,
      "meta": {},
      "lang": "en"
    },
    "matched_on": "2025-06-10T11:48:50.26961Z",
    "filter": "confluent tag:int-striim-news",
    "email_sent": false,
    "email_dont_send": false
  },
  {
    "id": "7ea924ef-f49f-4004-8ed8-c6c65435adf7",
    "item": {
      "backend": "Reddit",
      "backend_sub": "r/dataengineering",
      "type": "comment",
      "icon_url": "https://www.redditstatic.com/shreddit/assets/favicon/192x192.png",
      "timestamp": "2025-06-10T11:32:03Z",
      "item_url": "https://www.reddit.com/r/dataengineering/comments/1l4l99m/is_openflow_apache_nifi_in_snowflake_just_the/mwzymr9/",
      "author": "plot_twist_incom1ng",
      "text": "that's a spot-on observation for data engineers. gui a lot of times is more marketing pitch than actual value.\nmy team's pretty much all-in on code in git for transformations and orchestration. it just gives us the control and visibility we need.\nfor the extract and load part, it gets trickier. we've certainly looked at nifi for specific, high-volume ingestion. but a lot of us hit the wall on key things. for one, the \"click-ops and error prone\" aspect is a big one. even with the nifi registry for versioning, getting proper git branching, pull requests, and visual diffs of flow changes is a massive pain, almost non-existent.\ntools like Hevo and Fivetran really work in that aspect e/l side, and even for t. they're managed, handle schema changes, and integrate well - and its their bread and butter to keep pipelines flowing without a hitch, unlike tertiary capabilities in larger suites that are not really a priority for updates and advancements.",
      "title": "Is Openflow Apache Nifi In Snowflake Just The",
      "title_type": 0,
      "meta": {},
      "lang": "en"
    },
    "matched_on": "2025-06-10T11:32:52.576708Z",
    "filter": "fivetran tag:int-striim-news",
    "email_sent": false,
    "email_dont_send": false
  }
]
```