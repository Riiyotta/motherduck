// Chunk B datasets (PAGES_SPEC_EXTRA X3/X4/X8/X9/X10). Structure only, scraped from the original listings on 2026-10-26:
// slugs, dates, In Person/Online type, recording flag, the recording's /videos slug, local time + time-zone label and the
// character lengths of titles/descriptions/locations. All visible copy is generated placeholder text of matching length;
// event names are derived from slug words (allowed by the brief). No descriptions, notes, bios or transcripts are copied.
// Loaded only by the lazily imported chunk-B pages.

// Time labels referenced by index from EVENT_ROWS.
export const EVENT_TZ = ["10:30 PM India Standard Time","3:00 PM Europe, Helsinki","8:30 AM America, Los Angeles","11:00 PM India Standard Time","8:30 AM Europe, Paris","11:30 PM India Standard Time","10:00 PM India Standard Time","12:00 AM UTC","9:00 AM Europe, London","9:30 PM India Standard Time","6:15 PM America, Los Angeles","1:30 AM India Standard Time","7:00 PM Europe, London","6:00 PM Europe, Amsterdam","6:30 PM India Standard Time","5:30 PM America, New York","5:30 PM America, Los Angeles","8:30 PM India Standard Time","9:00 AM America, Los Angeles","6:00 PM America, Los Angeles","8:00 PM India Standard Time","9:00 AM Europe, Berlin","3:00 PM Europe, Amsterdam","5:00 PM America, Los Angeles","7:30 PM India Standard Time","5:30 PM Europe, Amsterdam","6:00 PM America, New York","8:00 AM America, Los Angeles","11:45 AM Europe, Berlin","1:00 PM America, Phoenix","7:00 PM America, Phoenix","9:00 AM America, New York","12:00 PM America, Los Angeles","8:00 AM America, Chicago","Nashville, 138 12th Ave N, Nashville, TN 37203 - 5:30 PM America, Chicago","5:30 AM America, Los Angeles","4:00 PM Europe, Amsterdam","10:00 AM America, Phoenix","1:00 AM India Standard Time","9:00 AM America, Chicago","2:00 PM Europe, Paris","12:00 AM Europe, Amsterdam","12:00 AM US, Pacific","8:00 AM America, New York","10:30 AM America, Los Angeles","12:30 PM India Standard Time","2:30 PM India Standard Time","9:00 AM US, Pacific","6:00 PM US, Pacific","9:00 AM Etc, GMT-1","7:00 PM Etc, GMT-1","9:30 AM US, Pacific","1:30 PM Europe, Amsterdam","5:00 PM US, Eastern","5:00 PM PST8PDT","12:30 AM India Standard Time","7:30 PM America, Los Angeles","6:30 PM America, Los Angeles","3:00 PM America, New York","3:00 PM America, Los Angeles","11:45 AM America, Los Angeles","8:00 PM CET","9:00 PM India Standard Time","9:00 AM Europe, Amsterdam","5:30 AM India Standard Time","3:30 PM US, Eastern","2:30 PM US, Eastern","11:15 PM India Standard Time","1:30 PM US, Pacific","9:30 AM America, Los Angeles","5:30 PM US, Eastern","5:00 PM US, Pacific","7:45 PM India Standard Time","5:00 PM America, New York","1:15 PM America, Los Angeles","4:00 PM America, Los Angeles","9:00 AM Etc, GMT-4","7:00 PM Etc, GMT+2","4:00 PM Europe, Prague","3:15 PM US, Eastern","6:00 PM Etc, GMT+2","2:30 PM Etc, GMT+2","11:00 AM US, Eastern","9:00 AM US, Eastern","6:00 PM US, Eastern","7:00 PM US, Central","2:00 PM CET","11:00 AM US, Central","6:30 PM GMT","7:45 PM US, Pacific","6:00 PM CET","2:30 AM India Standard Time","2:00 AM India Standard Time"]

// [slug, year, month, day, inPerson, recording, videoSlug, titleLen, descLen, locationLen, tzIndex, upcoming]
// Order = the original listing order: 7 upcoming (/events), then past pages 1-13 (20 per page).
export const EVENT_ROWS = [
  ["ducklake-performance-optimization-faster-queries-from-your-lakehouse-2026",2026,10,27,0,0,"",69,252,6,0,1],
  ["the-data-teams-new-tools-motherduck-at-helsinki-data-week-2026",2026,10,28,1,0,"",60,252,60,1,1],
  ["data-outpost-2026-2026",2026,11,5,1,0,"",17,172,39,2,1],
  ["duckdb-20-how-to-speed-up-your-workloads-2026",2026,11,10,0,0,"",42,227,6,0,1],
  ["aligned-on-decisions-how-our-product-lead-builds-with-data-agents-in-motherduck-2026",2026,11,12,0,0,"",80,241,6,3,1],
  ["forward-data-conference-2026-2026",2026,11,16,1,0,"",28,179,57,4,1],
  ["everyone-gets-a-data-agent-whats-coming-in-motherduck-from-our-ceo-2026",2026,11,17,0,0,"",68,228,6,5,1],
  ["behind-the-agent-how-hazel-built-an-ai-coworker-for-consumer-brands-2026",2026,10,21,0,1,"how-hazel-built-ai-coworker-consumer-brands",68,249,6,6,0],
  ["data-in-the-d-conference-2026-2026",2026,10,16,1,0,"",29,188,11,7,0],
  ["aligned-on-numbers-how-our-chief-of-staff-builds-internal-data-apps-with-agents-at-motherduck-2026",2026,10,15,0,1,"aligned-on-numbers-chief-of-staff-data-apps",94,289,6,6,0],
  ["data-decoded-mcr-2026",2026,10,13,1,0,"",16,131,34,8,0],
  ["data-weekend-atx-2026-2026",2026,10,10,1,0,"",21,174,44,7,0],
  ["jev-for-analytics-5-use-cases-on-real-data-2026",2026,10,8,0,1,"jev-for-analytics-use-cases",43,254,6,9,0],
  ["ship-scale-sail-sftechweek-2026",2026,10,5,1,0,"",31,190,21,10,0],
  ["virtual-workshop-build-a-data-agent-in-60-minutes-2026",2026,10,1,0,1,"build-a-data-agent-workshop",50,245,6,9,0],
  ["we-classified-100000-rows-in-40-seconds-introducing-promptjev-2026",2026,9,29,0,1,"prompt-jev-sql-text-classification",66,250,6,6,0],
  ["motherduck-builder-office-hours-september-24-2026",2026,9,25,0,0,"",46,218,6,11,0],
  ["big-data-london-2026",2026,9,23,1,0,"",15,415,24,8,0],
  ["duck-in-duck-out-london-edition-2026",2026,9,23,1,0,"",33,151,6,12,0],
  ["agents-in-prod-amsterdam-2026",2026,9,17,1,0,"",26,130,22,13,0],
  ["motherduck-builder-office-hours-september-17-2026",2026,9,17,0,0,"",46,218,6,14,0],
  ["motherduck-cli-query-pipelines-dashboards-for-your-agents-and-ci-2026",2026,9,16,0,1,"motherduck-cli-vs-mcp",67,253,6,9,0],
  ["dbt-summit-2026",2026,9,15,1,0,"",10,213,9,7,0],
  ["motherduck-builder-office-hours-september-10-2026",2026,9,11,0,0,"",46,218,6,11,0],
  ["data-takes-flight-transforming-data-with-spark-and-motherduck-via-iceberg-2026",2026,9,10,0,1,"spark-iceberg-motherduck-pipeline",74,250,6,6,0],
  ["motherduck-builder-office-hours-september-3-2026",2026,9,3,0,0,"",45,218,6,14,0],
  ["time-travel-schema-evolution-ducklake-handles-change-2026",2026,9,3,0,1,"ducklake-time-travel-schema-evolution",55,248,6,9,0],
  ["data-drinks-dives-2026",2026,8,27,1,0,"",21,241,26,15,0],
  ["motherduck-duckdb-august-meetup-2026",2026,8,27,1,0,"",33,251,13,16,0],
  ["do-ai-agents-need-a-semantic-layer-2026",2026,8,26,0,1,"ai-agents-semantic-layer",35,254,6,9,0],
  ["python-talk-night-at-motherduck-2026",2026,8,19,1,0,"",31,196,11,16,0],
  ["beyond-copilots-were-building-a-data-stack-live-with-ai-agents-2026",2026,8,18,0,1,"agentic-data-engineering-stack",64,252,6,17,0],
  ["introducing-guides-warehouse-native-context-for-ai-agents-2026",2026,8,13,0,1,"guides-context-layer-ai-agents",58,253,6,9,0],
  ["trust-the-agents-you-build-on-your-data-2026",2026,8,12,0,1,"text-to-sql-agent-evals",39,236,6,0,0],
  ["ai4-2026-2026",2026,8,4,1,0,"",8,186,27,18,0],
  ["let-your-agent-try-motherduck-2026",2026,8,4,0,0,"",29,240,6,9,0],
  ["motherduck-builder-office-hours-july-31-2026",2026,7,31,0,0,"",41,140,6,0,0],
  ["bi-is-having-a-midlife-crisis-2026",2026,7,29,0,1,"bi-midlife-crisis-ai",29,245,6,6,0],
  ["motherduck-duckdb-july-meetup-2026",2026,7,22,1,0,"",31,195,17,19,0],
  ["writing-robust-data-pipelines-with-ai-2026",2026,7,22,0,1,"robust-data-pipelines-ai",37,242,6,9,0],
  ["motherduck-builder-office-hours-july-21-2026",2026,7,21,0,0,"",41,140,6,20,0],
  ["motherduck-builder-office-hours-july-17-2026",2026,7,17,0,0,"",41,140,6,0,0],
  ["streaming-made-easy-practical-postgres-cdc-with-streamkap-motherduck-2026",2026,7,15,0,1,"postgres-cdc-streamkap-motherduck",71,236,6,6,0],
  ["wearedevelopers-world-congress-2026",2026,7,9,1,0,"",30,185,29,21,0],
  ["the-database-inside-your-lakehouse-a-ducklake-architecture-deep-dive-2026",2026,7,9,0,1,"ducklake-architecture-deep-dive",69,254,6,9,0],
  ["duckcon-7-2026",2026,6,24,1,0,"",10,182,35,22,0],
  ["amazon-ai-working-sessions-hosted-by-reason-automation-2026",2026,6,24,0,0,"",54,220,6,9,0],
  ["what-makes-a-great-data-viz-divemaxxing-winners-revealed-2026",2026,6,24,0,1,"what-makes-great-data-visualization",57,204,6,0,0],
  ["from-source-to-dashboard-real-pipelines-with-flights-2026",2026,6,23,0,1,"build-data-pipeline-ai-agent-flights",53,178,6,6,0],
  ["build-beautiful-data-apps-win-a-mac-mini-inside-the-divemaxxing-hackathon-2026",2026,6,19,0,0,"",76,210,6,5,0],
  ["spritz-cafai-happy-hour-at-databricks-data-ai-summit-2026",2026,6,17,1,0,"",56,180,56,23,0],
  ["blood-sugar-hex-magic-wednesday-2026",2026,6,17,1,0,"",34,171,32,23,0],
  ["introducing-flights-agent-native-data-pipelines-in-motherduck-2026",2026,6,17,0,1,"motherduck-flights-agent-native-data-pipelines",62,154,6,9,0],
  ["real-time-lakehouse-agentic-ai-2026",2026,6,15,1,0,"",32,180,13,19,0],
  ["is-your-postgres-slow-at-answering-analytics-questions-2026",2026,6,9,0,1,"postgres-slow-analytics-queries",55,246,6,0,0],
  ["motherduck-duckdb-june-meetup-2026",2026,6,3,1,0,"",31,171,17,7,0],
  ["agentic-analytics-in-the-wild-how-ai-agents-actually-query-your-data-2026",2026,6,2,0,0,"",69,242,6,24,0],
  ["nl-dbt-meetup-16th-edition-2026",2026,6,2,1,0,"",27,212,81,25,0],
  ["the-dive-motherduck-at-snowflake-summit-2026-2026",2026,6,1,1,0,"",46,161,45,7,0],
  ["how-top-e-commerce-data-teams-drive-revenue-with-llms-2026",2026,5,28,0,1,"ecommerce-data-teams-llms-revenue",53,245,6,9,0],
  ["analytics-engineering-meetup-ai-data-mesh-real-world-analytics-2026",2026,5,27,1,0,"",66,188,9,13,0],
  ["data-engineering-is-ai-engineering-2026",2026,5,26,0,1,"data-engineering-ai-engineering",34,232,6,9,0],
  ["motherduck-duckdb-may-meetup-2026",2026,5,21,1,0,"",30,165,17,19,0],
  ["agentic-data-engineering-building-pipelines-end-to-end-with-ai-2026",2026,5,19,0,1,"agentic-data-engineering-pipelines-ai",63,225,6,17,0],
  ["det-nyc-2-meetup-2026",2026,5,14,1,0,"",17,246,12,26,0],
  ["ship-it-dinner-drinks-on-a-boat-2026",2026,5,13,1,0,"",34,178,17,10,0],
  ["ai-council-2026",2026,5,12,1,0,"",10,528,17,27,0],
  ["building-a-data-product-on-motherduck-pricemedics-path-from-raw-data-to-revenue-2026",2026,5,12,0,1,"pricemedic-data-product-motherduck",81,233,6,5,0],
  ["how-marketers-and-aes-are-actually-using-ai-on-their-own-data-2026",2026,5,7,0,1,"ai-for-sales-marketing-teams",61,179,6,17,0],
  ["high-performance-data-workflows-with-python-and-duckdb-pydata-x-motherduck-2026",2026,4,30,1,0,"",76,206,19,16,0],
  ["duckdb-motherduck-meetup-2026",2026,4,30,1,0,"",26,149,25,19,0],
  ["pydata-amsterdam-meetup-agents-in-the-data-verse-2026",2026,4,30,1,0,"",49,189,20,25,0],
  ["the-ducklake-lakehouse-from-getting-started-to-going-fast-2026",2026,4,28,0,1,"ducklake-lakehouse-getting-started",58,181,6,9,0],
  ["a-practical-guide-to-context-management-for-data-agents-2025",2026,4,23,0,1,"context-management-data-agents",55,790,6,6,0],
  ["motherduck-now-speaks-postgres-fast-analytics-without-changing-your-stack-2026",2026,4,21,0,1,"motherduck-postgres-endpoint-demo",74,169,6,9,0],
  ["sql-is-dead-long-live-sql-engineering-a-reliable-analytics-agent-from-scratch-2026",2026,4,14,1,0,"",79,234,41,28,0],
  ["agentic-retrieval-sf-meetup-2026",2026,4,14,1,0,"",27,202,17,23,0],
  ["ai-agents-summit-2026",2026,4,14,1,0,"",16,188,11,18,0],
  ["data-day-with-datajoi-aztechweek-2026",2026,4,10,1,0,"",33,173,11,29,0],
  ["data-after-dark-aztechweek-2026",2026,4,10,1,0,"",27,156,7,30,0],
  ["zero-latency-analytics-in-your-application-with-dives-2026",2026,4,9,0,1,"zero-latency-analytics-dives-embed",53,166,6,9,0],
  ["whats-new-in-duckdb-15-2026",2026,4,7,0,1,"whats-new-duckdb-15",24,106,6,0,0],
  ["mcp-dev-summit-north-america-2026",2026,4,2,1,0,"",28,165,12,31,0],
  ["sneak-peek-ducklake-the-definitive-guide-2026",2026,4,2,0,1,"ducklake-definitive-guide-oreilly-book",43,211,6,9,0],
  ["seattle-ai-startups-summit-2026",2026,4,1,1,0,"",28,245,46,18,0],
  ["motherduck-duckdb-meetup-2026",2026,3,26,1,0,"",26,224,17,19,0],
  ["beyond-charts-building-interactive-data-apps-with-motherduck-dives-2026",2026,3,26,0,1,"interactive-data-apps-motherduck-dives",67,243,6,0,0],
  ["agents-that-build-tables-not-just-query-them-2026",2026,3,17,0,1,"motherduck-mcp-write-agent-sql",45,173,6,6,0],
  ["building-an-ai-chatbot-for-your-saas-app-in-1-day-2026",2026,3,11,0,1,"building-ai-chatbot-saas-mcp",49,481,6,9,0],
  ["pyai-conference-2026-2026",2026,3,10,1,0,"",20,147,42,18,0],
  ["seattle-x-shebuilds-on-lovable-for-international-womens-day-2026",2026,3,8,1,0,"",60,234,34,32,0],
  ["datatune-2026",2026,3,6,1,0,"",8,480,20,33,0],
  ["motherduck-meet-mingle-in-nashville-2026",2026,3,6,1,0,"",37,233,9,34,0],
  ["zed-x-motherduck-x-boundary-meetup-annoying-stuff-ai-gets-wrong-and-some-stuff-it-gets-right-2026",2026,2,26,1,0,"",95,486,11,19,0],
  ["from-ad-hoc-questions-to-real-time-answers-2026",2026,2,25,0,1,"ai-agent-shareable-visualizations",42,359,6,0,0],
  ["sf-apache-datafusion-meetup-2026",2026,2,19,1,0,"",27,513,17,35,0],
  ["streams-queries-quacks-a-data-meetup-with-estuary-motherduck-2026",2026,2,17,1,0,"",66,443,18,26,0],
  ["duckdb-developer-meeting-1-2026",2026,1,30,1,0,"",27,368,25,36,0],
  ["halfstack-2026",2026,1,30,1,0,"",9,421,11,37,0],
  ["meetup-motherduck-dlthub-marimo-2026",2026,1,29,1,0,"",38,413,25,22,0],
  ["let-your-ai-agents-cook-preparing-your-warehouse-for-ai-2026",2026,1,29,0,1,"preparing-data-warehouse-for-ai",56,330,6,3,0],
  ["the-mcp-sessions-vol-3-clickstream-analytics-2026",2026,1,28,0,0,"",47,411,6,38,0],
  ["data-day-texas-2026",2026,1,24,1,0,"",14,476,13,39,0],
  ["the-mcp-sessions-vol-2-supply-chain-analytics-2026",2026,1,21,0,1,"mcp-sessions-supply-chain-analytics",48,355,6,38,0],
  ["ai-agents-for-business-analytics-2026",2026,1,15,0,1,"reliable-ai-agents-for-business-analytics-llms-warehouse",32,402,6,3,0],
  ["the-mcp-sessions-vol-1-sports-analytics-2026",2026,1,14,0,1,"mcp-sports-analytics-claude-motherduck",42,369,6,38,0],
  ["workshop-build-a-serverless-lakehouse-with-ducklake-2025",2025,12,17,0,1,"building-serverless-lakehouse-with-ducklake",52,370,6,5,0],
  ["getting-started-with-motherduck-2025",2025,12,11,0,0,"",31,136,6,3,0],
  ["hands-on-lab-agentic-data-engineering-with-motherduck-2025",2025,12,3,0,0,"",54,144,6,5,0],
  ["aws-reinvent-cocktail-reception-2025",2025,12,2,1,0,"",32,172,25,16,0],
  ["nl-dbt-meetup-14th-edition-2025",2025,11,25,1,0,"",27,90,38,25,0],
  ["ducklake-talk-at-forward-data-conference-2025",2025,11,24,1,0,"",40,90,5,40,0],
  ["pydata-belgium-november-2025-2025",2025,11,20,1,0,"",28,143,31,41,0],
  ["data-based-going-beyond-the-dataframe-2025",2025,11,20,0,1,"going-beyond-the-dataframe",38,100,6,3,0],
  ["ai-by-the-bay-2025",2025,11,17,1,0,"",13,252,29,42,0],
  ["empowering-data-teams-smarter-ai-workflows-with-hex-motherduck-2025",2025,11,13,0,1,"smarter-ai-workflows-with-hex-motherduck",67,153,6,0,0],
  ["data-in-the-d-conference-2025-2025",2025,11,8,1,0,"",29,123,21,43,0],
  ["small-data-sf-keynotes-and-sessions-2025",2025,11,5,1,1,"jordan-tigani-unbearable-bigness-small-data",36,143,35,2,0],
  ["small-data-sf-workshop-day-2025",2025,11,4,1,0,"",28,143,35,44,0],
  ["lies-damn-lies-and-benchmarks-2025",2025,10,31,0,1,"lies-damn-lies-and-benchmarks",31,145,6,45,0],
  ["duck-flavored-bi-building-an-efficient-data-stack-2025",2025,10,29,0,1,"building-an-efficient-data-stack",50,158,6,17,0],
  ["boosting-data-performance-unlocking-the-power-of-duckdb-in-your-gold-layer-2025",2025,10,27,0,1,"unlocking-duckdb-in-your-gold-layer",75,130,6,17,0],
  ["data-apps-to-build-or-not-to-build-2025",2025,10,15,0,0,"",36,214,6,46,0],
  ["simplifying-the-transformation-layer-2025",2025,10,14,0,1,"simplifying-the-transformation-layer",36,146,6,46,0],
  ["dbt-coalesce-2025-2025",2025,10,null,1,1,"ducklake-big-data-small-coalesce-2025",17,206,27,47,0],
  ["streaming-kafka-data-into-motherduck-with-estuary-flow-2025",2025,10,9,0,0,"",54,116,6,9,0],
  ["just-use-postgres-and-duckdb-a-postgres-duckdb-community-night-sftechweek-2025",2025,10,7,1,0,"",79,147,17,48,0],
  ["from-raw-data-to-insights-with-datacoves-dbt-and-motherduck-2025",2025,9,25,0,1,"from-raw-data-to-insights",61,157,6,9,0],
  ["big-data-london-2025",2025,9,24,1,0,"",15,189,24,49,0],
  ["motherducking-big-data-london-party-2025",2025,9,24,1,0,"",36,207,23,50,0],
  ["modern-data-infra-summit-2025",2025,9,18,1,0,"",24,156,22,51,0],
  ["ai-native-summit-2025-by-zetta-2025",2025,9,10,1,0,"",32,230,27,32,0],
  ["from-curiosity-to-impact-how-dosomething-democratized-data-2025",2025,9,10,0,1,"from-curiosity-to-impact-how-dosomething-democratized-data",59,174,6,9,0],
  ["frankfurt-meetup-motherduck-duckdb-special-2025",2025,9,9,1,0,"",44,76,9,13,0],
  ["motherduck-duckdb-special-multiple-talks-2025",2025,9,8,1,0,"",44,60,22,13,0],
  ["getting-started-with-motherduck-2025-1",2025,9,4,0,0,"",31,238,6,9,0],
  ["duckdb-meets-ai-when-analytics-powers-ai-memory-with-cognee-2025",2025,9,3,0,0,"",60,150,6,17,0],
  ["pydata-berlin-more-than-dataframes-data-pipelines-with-the-swiss-army-knife-duckdb-2025",2025,9,1,1,0,"",85,206,20,52,0],
  ["hex-partners-and-agents-data-mixer-2025",2025,8,28,1,0,"",34,191,28,53,0],
  ["seattle-ai-workshop-night-with-neo4j-hypermode-and-motherduck-2025",2025,8,26,1,0,"",62,146,35,54,0],
  ["motherduck-x-molab-show-and-tell-2025",2025,8,13,0,0,"",32,171,6,55,0],
  ["getting-started-with-motherduck-2025-2",2025,8,8,0,0,"",31,160,6,9,0],
  ["ai-hack-quack-2025",2025,7,31,1,0,"",15,108,25,23,0],
  ["duck-duck-stream-how-to-efficiently-load-data-into-ducklake-with-estuary-2025",2025,7,24,0,1,"how-to-efficiently-load-data-into-ducklake-with-estuary",73,165,6,9,0],
  ["seattle-summer-fireside-chat-the-future-of-ai-2025",2025,7,22,1,0,"",46,176,57,19,0],
  ["getting-started-with-motherduck-ducklake-2025",2025,6,26,0,0,"",42,132,6,9,0],
  ["ducklake-the-future-of-open-table-formats-2025",2025,6,17,0,1,"ducklake-livestream",43,196,6,17,0],
  ["paaartaaaay-with-ducks-at-data-ai-summit-2025",2025,6,10,1,0,"",42,219,34,56,0],
  ["getting-started-with-motherduck-2025-3",2025,6,4,0,0,"",31,160,6,9,0],
  ["paaartaaaay-with-ducks-at-snowflake-summit-2025",2025,6,2,1,0,"",42,226,35,57,0],
  ["the-dive-2025",2025,6,1,1,0,"",8,195,45,7,0],
  ["cultivating-growth-how-gardyn-scaled-its-data-operations-2025",2025,5,28,0,1,"cultivating-growth-how-gardyn-scaled-its-data-operations-with-motherduck",57,170,6,0,0],
  ["stay-in-flow-with-motherducks-instant-sql-2025",2025,5,21,0,1,"stay-in-flow-with-motherducks-instant-sql",42,124,6,6,0],
  ["odsc-east-making-big-data-feel-small-with-duckdb-2025",2025,5,15,1,0,"",49,186,26,58,0],
  ["stay-in-flow-with-motherducks-instant-sql-2025-1",2025,5,14,0,1,"stay-in-flow-with-motherducks-instant-sql",42,124,6,6,0],
  ["getting-started-with-motherduck-2025-4",2025,5,8,0,0,"",31,160,6,6,0],
  ["getting-started-with-motherduck-sneak-peek-of-instant-preview-mode-2025",2025,4,24,0,0,"",68,160,6,9,0],
  ["data-talks-on-the-rocks-real-time-roundtable-data-council-2025",2025,4,23,1,0,"",60,190,31,16,0],
  ["data-council-session-instant-preview-mode-real-time-feedback-to-make-sql-data-exploration-fly-2025",2025,4,23,1,1,"what-if-sql-queries-returned-results-instantly",96,241,35,59,0],
  ["a-practical-guide-to-context-management-for-data-agents-2026",2025,4,23,0,1,"context-management-data-agents",55,128,6,6,0],
  ["data-council-2025-2025",2025,4,22,1,0,"",17,87,25,27,0],
  ["data-council-workshop-more-than-a-vibe-ai-driven-sql-that-actually-works-2025",2025,4,22,1,1,"more-than-a-vibe-ai-driven-sql-that-actually-works",75,166,35,60,0],
  ["hold-on-wheres-my-context-2025",2025,4,16,1,0,"",30,254,23,61,0],
  ["practical-uses-for-ai-in-your-data-workflows-2025",2025,4,9,0,1,"practical-ai-use-cases-for-data",44,369,6,6,0],
  ["database-is-the-heart-of-the-business-community-meetup-2025",2025,4,3,1,0,"",55,89,37,19,0],
  ["getting-started-with-the-duckdb-ui-motherduck-2025",2025,4,2,0,0,"",47,157,6,9,0],
  ["build-a-real-time-cdc-pipeline-with-estuary-motherduck-2025",2025,3,27,0,0,"",56,344,6,0,0],
  ["bem-ai-data-panel-2025",2025,3,26,1,0,"",19,272,17,16,0],
  ["panel-scaling-duckdb-to-tbs-and-pbs-with-smallpond-motherduck-and-homegrown-solutions-2025",2025,3,11,0,1,"scaling-duckdb-panel-ondemand",88,398,6,62,0],
  ["fast-scalable-analytics-pipelines-with-motherduck-dlthub-2025",2025,2,26,0,0,"",60,317,6,9,0],
  ["getting-started-with-motherduck-2025-5",2025,2,20,0,0,"",31,203,6,0,0],
  ["local-dev-to-cloud-prod-2025",2025,2,13,0,0,"",23,299,6,0,0],
  ["duckcon-6-amsterdam-2025",2025,1,31,1,0,"",21,210,25,22,0],
  ["supercharge-duckdb-with-motherduck-scale-share-and-simplify-analytics--2025",2025,1,31,1,0,"",72,58,13,63,0],
  ["webinar-getting-started-with-motherduck-2025",2025,1,23,0,0,"",41,158,6,0,0],
  ["compete-for-a-10000-prize-pool-with-the-airbyte-motherduck-hackathon-2025",2025,1,21,0,0,"",73,181,6,64,0],
  ["webinar-shifting-left-and-moving-forward-with-motherduck-and-dagster-2025",2025,1,14,0,0,"",70,216,6,0,0],
  ["data-rock-n-roll-at-aws-reinvent-2024",2024,12,3,1,0,"",34,174,26,19,0],
  ["ai-native-summit-2024-2024",2024,11,21,1,0,"",21,153,45,32,0],
  ["seattle-iceberg-streaming-analytics-meetup-2024",2024,11,21,1,0,"",43,155,69,16,0],
  ["datagalaxy-tech-summit-nyc-how-to-put-duckdb-to-work-today-2024",2024,11,13,1,0,"",60,244,16,65,0],
  ["small-data-nyc-watch-party-wednesday-with-altana-jamsocket-and-motherduck-2024",2024,11,13,1,0,"",75,165,34,26,0],
  ["pydata-nyc-a-duck-in-the-hand-is-worth-two-in-the-cloud-data-preparation-and-analytics-on-your-laptop-with-duckdb-2024",2024,11,8,1,1,"a-duck-in-the-hand-is-worth-two-in-the-cloud",115,236,37,66,0],
  ["odsc-west-small-data-manifesto-data-infrastructure-to-build-bigger-with-less-2024",2024,10,31,0,0,"",78,254,9,67,0],
  ["quack-code-pgduckdb-with-engineer-jelte-fennema-nio-2024",2024,10,30,0,0,"",55,228,9,9,0],
  ["data-streaming-summit-motherduck-the-ai-lakehouse-2024",2024,10,29,1,0,"",52,225,41,68,0],
  ["the-postmodern-data-stack-2024",2024,10,28,1,0,"",25,162,41,69,0],
  ["duckdb-amsterdam-meetup-1-2024",2024,10,17,1,0,"",26,194,41,13,0],
  ["its-ducking-easy-from-zero-to-insight-with-motherduck-and-dbt-2024",2024,10,17,0,1,"ducking-easy-insights-motherduck-dbt",63,220,9,0,0],
  ["harnessing-ai-for-relational-data-industry-and-research-perspectives-2024",2024,10,10,1,0,"",69,142,39,70,0],
  ["gatsbys-golden-happy-hour-dbt-coalesce-2024",2024,10,9,1,0,"",42,231,33,71,0],
  ["simplify-your-dbt-data-pipelines-with-serverless-duckdb-2024",2024,10,8,1,0,"",55,194,31,32,0],
  ["introduction-to-duckdb-sql-2024",2024,10,8,0,0,"",26,37,6,17,0],
  ["motherduck-dbt-coalesce-2024-2024",2024,10,7,1,0,"",30,176,31,23,0],
  ["a-new-paradigm-for-data-visualization-with-just-sql-markdown-2024",2024,9,24,0,1,"a-new-paradigm-for-data-visualization-with-just-sql-markdown",62,211,6,14,0],
  ["small-data-sf-2024",2024,9,23,1,0,"",13,203,20,27,0],
  ["going-beyond-two-tier-data-architectures-with-duckdb-2024",2024,9,12,0,0,"",52,137,6,72,0],
  ["duckdb-is-fast-for-analytics-but-what-can-it-do-for-ai-2024",2024,9,12,0,0,"",56,194,6,14,0],
  ["dbt-data-modeling-challenge-socialmedia-edition-2024",2024,9,9,0,0,"",50,234,9,0,0],
  ["data-for-ai-presents-the-open-source-afterparty-w-motherduck-datastrato-more-2024",2024,8,29,1,0,"",83,197,20,19,0],
  ["duckcon-5-2024",2024,8,15,1,0,"",10,83,21,68,0],
  ["happy-hour-with-madrona-zetta-fixie-and-motherduck-2024",2024,8,14,1,0,"",53,158,16,57,0],
  ["motherduckduckdb-meetup-nyc-edition-2024",2024,8,7,1,0,"",37,204,15,73,0],
  ["data-discoverability-with-secoda-and-motherduck-2024",2024,7,31,0,1,"data-discoverability-secoda-motherduck",47,202,9,0,0],
  ["data-lakes-drive-next-gen-ai-infrastructure-2024",2024,7,23,0,0,"",43,193,9,0,0],
  ["ducks-in-a-row-take-flight-with-the-modern-duck-stack-2024",2024,7,23,0,1,"take-flight-with-the-modern-duck-stack",54,153,9,24,0],
  ["scipy-2024-how-to-bootstrap-a-data-warehouse-with-duckdb-2024",2024,7,12,1,0,"",57,255,20,74,0],
  ["scipy-2024-all-the-sql-a-pythonista-needs-to-know-an-introduction-to-sql-and-dataframes-with-duckdb-2024",2024,7,9,1,0,"",101,241,20,27,0],
  ["hack-night-github-with-motherduck-weaviate-and-friends-2024",2024,7,9,1,0,"",58,53,22,75,0],
  ["the-future-of-programming-accelerating-coding-workflows-with-llms-radar-ai-edition-2024",2024,6,27,0,0,"",87,245,9,62,0],
  ["quacking-the-code-to-multi-tenant-embedded-analytics-with-gooddata-motherduck-2024",2024,6,20,0,0,"",79,122,9,9,0],
  ["getting-started-with-motherduck-2024",2024,6,18,0,0,"",31,244,9,0,0],
  ["motherducking-party-databricks-data-ai-summit-2024",2024,6,11,1,0,"",53,212,27,19,0],
  ["motherduck-at-the-deem-workshop-at-sigmod-2024",2024,6,9,1,0,"",41,240,20,76,0],
  ["european-data-meetup-vector-embeddings-rag-use-cases-in-motherduck-2024",2024,6,6,1,0,"",69,250,23,77,0],
  ["motherducking-party-snowflake-summit--2024",2024,6,3,1,0,"",42,245,27,19,0],
  ["goodmeetup-5-what-the-duck-is-up-with-duckdb-2024",2024,5,29,1,0,"",47,249,27,78,0],
  ["data-scale-conference-taking-flight-with-interactive-analytics-2024",2024,5,22,0,0,"",64,254,6,9,0],
  ["motherduck-duckdb-meetup-seattle-2024",2024,5,20,1,0,"",36,244,21,48,0],
  ["pycon-us-2024-talk-on-python-duckdb-2024",2024,5,18,1,0,"",38,141,24,79,0],
  ["duckdb-iceberg-the-future-of-lightweight-data-management-2024",2024,5,16,0,1,"duckdb-iceberg-the-future-of-lightweight-data-management",60,181,6,55,0],
  ["tumuchdata-industry-talk-on-motherduck-serverless-data-analytics-with-duckdb-2024",2024,4,24,1,0,"",77,182,20,80,0],
  ["data-peeps-nyc-trivia-night-edition-2024",2024,4,24,1,0,"",36,177,21,70,0],
  ["duckdb-101-workshop-2024",2024,4,24,1,0,"",19,225,20,81,0],
  ["odsc-data-engineering-summit-2024",2024,4,23,1,0,"",28,127,16,82,0],
  ["local-dev-cloud-prod-with-dagster-and-motherduck-2024",2024,4,18,0,1,"local-dev-cloud-prod-with-dagster-and-motherduck",49,229,6,0,0],
  ["hasura-dev-day-panel-its-all-about-the-data-2024",2024,4,16,0,0,"",45,208,6,9,0],
  ["mds-fest-20-beyond-the-cloud-the-future-of-analytics-in-the-hybrid-era-2024",2024,4,12,0,0,"",74,248,6,62,0],
  ["data-universe-conference-2024",2024,4,10,1,0,"",24,230,21,83,0],
  ["happy-hour-with-data-universe-friends-2024",2024,4,10,1,0,"",37,118,21,84,0],
  ["duckdb-behind-the-magic-parsing-the-unparseable-csvs-2024",2024,4,10,0,0,"",54,204,16,17,0],
  ["take-flight-with-dbt-and-duckdb-on-paradime-2024",2024,4,4,0,1,"take-flight-with-dbt-and-duckdb-dropping-dev-warehouse-costs-to-zero",43,198,16,0,0],
  ["cloud-infra-nyc-march-meetup-hosted-by-vantage-2024",2024,3,28,1,0,"",47,216,21,70,0],
  ["spatial-data-management-with-duckdb-ft-mattforrest-2024",2024,3,28,0,1,"spatial-data-management-with-duckdb-ft-mattforrest",51,136,16,11,0],
  ["unfinished-business-re-inventing-modern-data-tools-2024",2024,3,27,0,1,"unfinished-business-re-inventing-modern-data-tools",53,232,16,0,0],
  ["data-council-pre-party-hosted-by-cube-and-motherduck-2024",2024,3,25,1,0,"",53,168,20,85,0],
  ["motherduck-duckdb-user-meetup-fr-march-2023-edition-4-2024",2024,3,13,1,0,"",58,230,18,13,0],
  ["datatune-nashville-2024-2024",2024,3,7,1,0,"",23,172,13,39,0],
  ["duckdb-streamlit-crafting-dynamic-dashboards-and-data-apps-2024",2024,2,14,0,0,"",62,72,9,24,0],
  ["duckcon-4-by-duckdb-labs-and-foundation-2024",2024,2,2,1,0,"",40,117,22,86,0],
  ["sql-ide-safari-harlequin-in-your-terminal-2024",2024,2,1,0,0,"",44,55,6,11,0],
  ["an-abridged-history-of-duckdb-database-tech-from-amsterdam-2024",2024,1,27,1,0,"",59,252,23,87,0],
  ["duckdb-meetup-dublin-2024",2024,1,23,1,0,"",20,241,15,88,0],
  ["the-power-of-wasm-for-analytics-duckdb-in-the-browser-2024",2024,1,19,0,0,"",54,151,8,11,0],
  ["cidr-paper-presentation-duckdb-in-the-cloud-and-in-the-client-2024",2024,1,16,1,0,"",62,150,27,89,0],
  ["friendlier-sql-with-duckdb-2023",2023,12,21,0,0,"",26,236,6,11,0],
  ["pydata-stockholm-duckdb-transforming-data-management-and-analytics-2023",2023,12,14,1,0,"",69,128,9,90,0],
  ["osa-con-23-an-overview-of-duckdb-2023",2023,12,13,0,0,"",33,44,6,0,0],
  ["osa-con-23-what-the-duck-2023",2023,12,13,0,0,"",26,154,6,55,0],
  ["movedata-by-airbyte-fixing-the-data-engineering-lifecycle-2023",2023,12,7,0,0,"",61,206,20,91,0],
  ["opendi-summit-on-open-data-and-open-infrastructures-2023",2023,12,6,0,0,"",52,133,6,92,0],
]

// [kind, slug, variant (std | lp | side), titleLen, tags, date, featuring author slugs, youtube, block counts
// [p, h2, h3, ul, ol, blockquote, hr, code, table], prose chars]
export const WEBINAR_ROWS = [
  ["video","fix-slow-postrges-analytics","std",62,["YouTube"],"Jul 17, 2025",["mehdi-ouazza"],1,[17,4,3,8,0,0,0,0,0],3656],
  ["video","reliable-ai-agents-for-business-analytics-llms-warehouse","std",41,["AI, ML and LLMs"],"Jan 16, 2026",["ryan-boyd"],0,[11,6,0,2,1,2,0,0,1],2578],
  ["webinar","building-an-efficient-data-stack","std",50,["Webinar"],"Oct 29, 2025",["jacob-matson"],0,[13,6,0,0,0,0,0,0,0],8444],
  ["webinar","building-data-apps-and-customer-facing-analytics","std",59,["Webinar"],"Oct 15, 2025",["mehdi-ouazza"],0,[22,7,0,2,0,0,0,0,0],9826],
  ["webinar","data-discoverability-secoda-motherduck","lp",47],
  ["webinar","ducking-easy-insights-motherduck-dbt","lp",63],
  ["webinar","ducklake-livestream","std",61,["Interview"],"Jun 17, 2025",["jordan-tigani","hannes-muhleisen"],0,[33,5,3,3,1,4,5,3,0],8675,[1,1,1,0]],
  ["webinar","from-raw-data-to-insights","std",53,["Webinar","dbt"],"Sep 25, 2025",["jacob-matson"],0,[17,5,5,2,1,0,5,0,0],8688],
  ["webinar","getting-started-with-motherduck-hosted-ducklake","std",47,["Webinar"],"Jun 26, 2025",["jacob-matson"],0,[0,0,0,0,0,0,0,0,0],0],
  ["webinar","practical-ai-use-cases-for-data","std",45,["Interview","AI, ML and LLMs","Data Quality","Data Pipelines"],"Apr 10, 2025",["mehdi-ouazza"],0,[1,0,0,1,0,0,0,0,0],471],
  ["webinar","scaling-duckdb-panel","std",80,["Webinar","Interview"],"Mar 18, 2025",[],0,[3,0,0,0,0,0,0,0,0],641],
  ["webinar","scaling-duckdb-panel-ondemand","lp",80],
  ["webinar","simplifying-the-transformation-layer","std",36,["Webinar"],"Oct 14, 2025",["mehdi-ouazza"],0,[14,7,0,0,0,0,0,0,0],8280],
  ["webinar","take-flight-with-the-modern-duck-stack","side",54],
  ["webinar","unlocking-duckdb-in-your-gold-layer","std",75,["Webinar"],"Oct 27, 2025",["mehdi-ouazza","mael-deschamps"],0,[17,6,1,0,0,0,0,0,0],7860],
]

/* ------------------------------------------------------------------ helpers ------------------------------------------------------------------ */
import { rng, chars, title, int, hash, shaped, exactTitle, MONTHS_LONG } from '../../content/lorem.js'

const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const pad = (n) => String(n).padStart(2, '0')
const capWords = (s) => s.split(' ').map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w)).join(' ')
const lazy = (fn) => { let v; return () => (v ??= fn()) }

// Generic person name of roughly the given letter counts (never a real name).
export function personName(seed, lens = [5, 7]) {
  return capWords(shaped(lens, seed, { sentence: false }))
}

/* ------------------------------------------------------------------ events ------------------------------------------------------------------ */
// eventTitleFromSlug: shared with the /events hub rows (content/slugNames.js).
import { eventTitleFromSlug } from '../../content/slugNames.js'

export { eventTitleFromSlug }


// Measured article shapes for the two spec samples; other slugs get a seeded shape in the same ranges.
const DETAIL_SHAPES = {
  'ai-council-2026': { about: 560, learn: [82, 112, 72], audience: [18, 14, 17, 15] },
  'ai-by-the-bay-2025': { about: 275 },
}

function makeEvent(row, i) {
  const [slug, y, m, d, inPerson, rec, video, tl, dl, ll, tz, up] = row
  const seed = hash(slug) % 100000
  const r = rng(seed)
  const type = inPerson ? 'In Person' : 'Online'
  const location = inPerson ? title(Math.max(8, ll - 2), seed + 3) : 'Online'
  const time = EVENT_TZ[tz] || ''
  const shape = DETAIL_SHAPES[slug] || (() => {
    const rich = r() < 0.5
    return { about: int(r, 250, 530), ...(rich && { learn: [int(r, 60, 95), int(r, 60, 95), int(r, 60, 95)], audience: [int(r, 12, 18), int(r, 12, 18), int(r, 12, 18), int(r, 12, 18)] }) }
  })()
  return {
    i, slug, video, upcoming: Boolean(up), past: !up, recording: Boolean(rec),
    type, format: type, price: 'Free',
    year: y, month: MONTHS_LONG[m - 1], monthShort: MON[m - 1], day: pad(d),
    date: `${MON[m - 1]} ${pad(d)}, ${y}`,
    time,
    dateLong: `${MON[m - 1]} ${pad(d)}, ${y} at ${time}`,
    location,
    locationLine: time ? `${location} - ${time}` : location,
    title: eventTitleFromSlug(slug),
    titleLen: tl,
    desc: chars(dl, seed + 11),
    about: chars(shape.about, seed + 21),
    learn: shape.learn?.map((n, k) => chars(n, seed + 31 + k)),
    audience: shape.audience?.map((n, k) => capWords(exactTitle(n, seed + 41 + k))),
  }
}

export const allEvents = lazy(() => EVENT_ROWS.map(makeEvent))
export const upcomingEvents = lazy(() => allEvents().filter((e) => e.upcoming))
export const pastEvents = lazy(() => allEvents().filter((e) => e.past))
export const getEvent = (slug) => allEvents().find((e) => e.slug === slug) || null
// Original "More Upcoming Events": the same three upcoming cards on every detail page (upcoming #2-#4).
export const moreUpcoming = () => upcomingEvents().slice(1, 4)
export const PAST_PER_PAGE = 20
export const pastPageCount = () => Math.ceil(pastEvents().length / PAST_PER_PAGE)

/* ------------------------------------------------------------------ webinars ------------------------------------------------------------------ */
// Prose body with the measured block mix and total length (ArticleProse AST). Copy is generated.
// cite(n): optional attribution inline for the n-th quote (second <p> in the blockquote).
function webinarBody(counts, total, seed, cite = () => null) {
  const [p, h2, h3, ul, ol, quote, hr, code, table] = counts
  if (!p && !ul) return []
  const r = rng(seed)
  const per = Math.max(60, Math.round((total - h2 * 30 - h3 * 26) / Math.max(1, p + ul * 2 + ol * 2 + quote)))
  const sections = Math.max(1, h2)
  const blocks = []
  const left = { p, h3, ul, ol, quote, hr, code, table }
  const take = (k) => (left[k] > 0 ? (left[k]--, true) : false)
  for (let s = 0; s < sections; s++) {
    if (h2) {
      const text = title(int(r, 18, 40), seed + s * 7)
      blocks.push({ type: 'h2', text, id: `section-${s + 1}` })
    }
    const share = Math.ceil(p / sections)
    for (let k = 0; k < share && take('p'); k++) {
      blocks.push({ type: 'p', inl: k === 0 && r() < 0.5 ? [{ t: 'strong', c: `${title(int(r, 8, 18), seed + s * 13 + k)}:` }, ` ${chars(per, seed + s * 31 + k)}`] : [chars(per, seed + s * 31 + k)] })
      if (k === 0 && take('quote')) {
        const q = { type: 'quote', inl: [chars(int(r, 90, 160), seed + s * 41)] }
        const c = cite(quote - left.quote - 1)
        if (c) q.cite = c
        blocks.push(q)
      }
      if (k === 1 && take('h3')) blocks.push({ type: 'h3', text: title(int(r, 16, 34), seed + s * 17), id: `sub-${s + 1}` })
    }
    for (let u = 0; u < Math.ceil(ul / sections) && take('ul'); u++) blocks.push({ type: 'ul', items: Array.from({ length: 3 }, (_, k) => ({ inl: [chars(int(r, 50, Math.min(220, per)), seed + s * 53 + u * 7 + k)] })) })
    for (let u = 0; u < Math.ceil(ol / sections) && take('ol'); u++) blocks.push({ type: 'ol', items: Array.from({ length: 3 }, (_, k) => ({ inl: [chars(int(r, 50, Math.min(220, per)), seed + s * 59 + u * 7 + k)] })) })
    while (s === sections - 1 && left.h3 > 0 && take('h3')) blocks.push({ type: 'h3', text: title(int(r, 16, 34), seed + s * 19 + left.h3), id: `sub-${s + 1}-${left.h3}` }, { type: 'p', inl: [chars(per, seed + s * 23 + left.h3)] })
    if (take('code')) blocks.push({ type: 'code', lang: 'sql', code: 'SELECT region, count(*) AS events\nFROM sample_events\nGROUP BY region\nORDER BY events DESC;' })
    if (take('table')) blocks.push({ type: 'table', head: ['Option', 'Latency', 'Cost'], rows: [['Sample A', '120 ms', '4%'], ['Sample B', '80 ms', '7%'], ['Sample C', '45 ms', '9%']] })
    if (s < sections - 1 && take('hr')) blocks.push({ type: 'hr' })
  }
  while (take('p')) blocks.push({ type: 'p', inl: [chars(per, seed + blocks.length * 3)] })
  return blocks
}

function makeWebinar(row, i) {
  // cites: per quote, the index into `feat` of the speaker it is attributed to ("— Name [mm:ss]"), as on the original
  const [kind, slug, variant, tl, tags = [], date = '', feat = [], yt = 0, counts, total, cites = []] = row
  const seed = 7000 + i * 37
  const base = { i, kind, slug, variant, title: exactTitle(tl, seed) }
  if (variant !== 'std') return base
  const featuring = feat.map((a, k) => ({ slug: a, name: personName(seed + k * 5, [int(rng(seed + k), 4, 7), int(rng(seed + k + 1), 5, 9)]) }))
  return {
    ...base,
    tags,
    date,
    featuring,
    player: yt ? 'youtube' : 'gated',
    body: webinarBody(counts, total, seed, (n) => {
      const who = featuring[cites[n]]
      if (!who) return null
      const at = 600 + n * 760 + int(rng(seed + n * 3), 0, 420) // generated timestamp (seconds), increasing per quote
      return [`— ${who.name} [${pad(Math.floor(at / 60))}:${pad(at % 60)}]`]
    }),
  }
}

export const webinars = lazy(() => WEBINAR_ROWS.map(makeWebinar))
export const getWebinar = (kind, slug) => webinars().find((w) => w.kind === kind && w.slug === slug) || null

/* ------------------------------------------------------------------ podcast ------------------------------------------------------------------ */
// [slug, date, duration, guestNameLen | 0, titleLen, summaryLen, episode-page taglineLen, chapters, transcript paragraphs
// (0 = no transcript on the original)] newest first (measured listing order, counts and lengths).
const EPISODE_ROWS = [
  ['0011-reliable-ai-agents-checkpoints', 'Oct 20, 2026', '52:57', [4, 5], 71, 265, 77, 13, 0],
  ['0010-aws-bought-ducklabs', 'Sep 9, 2026', '58:47', 0, 51, 336, 38, 11, 0],
  ['0009-agents-md-vs-skills', 'Aug 24, 2026', '51:05', [5, 10], 73, 337, 83, 16, 0],
  ['0008-ai-still-writes-python-311', 'Aug 6, 2026', '49:36', 0, 55, 363, 38, 13, 110],
  ['0007-safest-bet-ai-hardware', 'Jul 28, 2026', '50:30', 0, 32, 276, 36, 13, 433],
  ['0006-ai-inside-sql', 'Jun 26, 2026', '47:44', [9, 4], 50, 440, 100, 15, 67],
  ['0005-data-viz-javascript', 'Jun 19, 2026', '49:57', [3, 5], 42, 292, 89, 10, 157],
  ['0004-data-infra-printing-money', 'Jun 13, 2026', '45:15', 0, 48, 370, 36, 12, 165],
  ['0003-duckdb-breaks-the-lakehouse', 'Jun 5, 2026', '47:06', [6, 5], 45, 441, 85, 10, 234],
  ['0002-github-stars-65-lines-markdown', 'May 29, 2026', '52:27', 0, 55, 307, 38, 15, 154],
  ['0001-ai-tooling-wars', 'May 22, 2026', '55:03', 0, 56, 222, 36, 16, 144],
]
const longDate = (d) => { const [mon, day, y] = d.replace(',', '').split(' '); return `${MONTHS_LONG[MON.indexOf(mon)]} ${day}, ${y}` }

function makeEpisode(row, i) {
  const [slug, date, duration, guest, tl, sl, tagLen, nChapters, nParas] = row
  const seed = 9100 + i * 53
  const r = rng(seed)
  const host = personName(seed + 1, [5, 6])
  const transcript = Array.from({ length: nParas }, (_, k) => {
    const sec = k * 22
    return { t: `${Math.floor(sec / 60)}:${pad(sec % 60)}`, text: chars(int(r, 60, 260), seed + 300 + k) }
  })
  return {
    n: slug.slice(0, 4), slug, date, dateLong: longDate(date), duration,
    guest: guest ? personName(seed + 2, guest) : null,
    title: exactTitle(tl, seed),
    // index tagline measured 77ch ("Hosted by <host>, <guest/role>"); generated to the same length
    // index (latest) tagline measured 77ch; episode-page tagline per episode
    tagline: `Hosted by ${host}, ${chars(64 - host.length, seed + 4).replace(/\.$/, '')}`,
    pageTagline: `Hosted by ${host}${tagLen > 30 ? `, ${chars(Math.max(4, tagLen - 12 - host.length), seed + 5).replace(/\.$/, '')}` : ''}`,
    summary: chars(sl, seed + 3),
    chapters: Array.from({ length: nChapters }, (_, k) => ({ t: `${pad(Math.floor((k * 200) / 60))}:${pad((k * 200) % 60)}`, label: title(int(r, 18, 52), seed + 40 + k) })),
    links: Array.from({ length: 10 }, (_, k) => title(int(r, 24, 48), seed + 70 + k)),
    notes: [
      { type: 'h2', text: 'Show notes', id: 'show-notes' },
      { type: 'p', inl: [chars(int(r, 260, 420), seed + 90)] },
      { type: 'p', inl: [chars(int(r, 220, 380), seed + 91)] },
      { type: 'h2', text: 'Key takeaways', id: 'key-takeaways' },
      { type: 'ul', items: Array.from({ length: 4 }, (_, k) => ({ inl: [chars(int(r, 80, 160), seed + 92 + k)] })) },
    ],
    transcript,
  }
}

export const episodes = lazy(() => EPISODE_ROWS.map(makeEpisode))
export const getEpisode = (slug) => episodes().find((e) => e.slug === slug) || null
