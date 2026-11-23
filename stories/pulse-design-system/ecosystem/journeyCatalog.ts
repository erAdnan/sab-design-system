export type JourneyPageLink = { label: string; href?: string };
export type JourneyBranch = { title: string; href?: string; pages: JourneyPageLink[] };

/** Figma SAB Source Inventory (22159:49773) — coded for sharp Storybook rendering. */
export const JOURNEY_ROOT = {
  title: "SAB mobile App All Journeys",
  status: "Status December 2026",
} as const;

export const JOURNEY_BRANCHES: JourneyBranch[] = [
  {
    title: "00. SAB DS Components and Foundations",
    href: "https://www.figma.com/design/aKIKPnmATfD1frHKxEslqP/00.-SAB-DS-Components-and-Foundations?m=auto&t=DIliarJOnp3WZHEK-6",
    pages: [
    ],
  },
  {
    title: "01. Dashboard & HUBS",
    href: "https://www.figma.com/design/yO2mN2WuRRdHBegj6ZYTNe/01.-Dashboard---HUBS?m=auto&t=DIliarJOnp3WZHEK-6",
    pages: [
      { label: "HUBS 2026 - Level 1,  Home, Transfers, Payments Accounts, Cards", href: "https://www.figma.com/design/yO2mN2WuRRdHBegj6ZYTNe?node-id=1-24" },
      { label: "HUBS 2026 - Finance", href: "https://www.figma.com/design/yO2mN2WuRRdHBegj6ZYTNe?node-id=12-93287" },
      { label: "HUBS 2026 - Investment", href: "https://www.figma.com/design/yO2mN2WuRRdHBegj6ZYTNe?node-id=12-97601" },
      { label: "Lite Dashboard", href: "https://www.figma.com/design/yO2mN2WuRRdHBegj6ZYTNe?node-id=12-103159" },
      { label: "For You Customisation", href: "https://www.figma.com/design/yO2mN2WuRRdHBegj6ZYTNe?node-id=12-118535" },
      { label: "Search Bar - Header", href: "https://www.figma.com/design/yO2mN2WuRRdHBegj6ZYTNe?node-id=12-131767" },
    ],
  },
  {
    title: "02. Cards Hub",
    href: "https://www.figma.com/design/18W7DQiB4FKjLGHNTaORuh/02.-Cards-Hub?m=auto&t=DIliarJOnp3WZHEK-6",
    pages: [
      { label: "Credit Card Application Journeys", href: "https://www.figma.com/design/18W7DQiB4FKjLGHNTaORuh?node-id=968-86657" },
      { label: "Credit Card Services", href: "https://www.figma.com/design/18W7DQiB4FKjLGHNTaORuh?node-id=968-86658" },
      { label: "Umlaty Card Services", href: "https://www.figma.com/design/18W7DQiB4FKjLGHNTaORuh?node-id=968-86659" },
      { label: "Supplementary Card Services", href: "https://www.figma.com/design/18W7DQiB4FKjLGHNTaORuh?node-id=968-86660" },
      { label: "AQSAT Card Services", href: "https://www.figma.com/design/18W7DQiB4FKjLGHNTaORuh?node-id=968-86661" },
    ],
  },
  {
    title: "03. Payments",
    href: "https://www.figma.com/design/JNCLzwdxmFzhbFMgM5Gqzx/03.-Payments?m=auto&t=DIliarJOnp3WZHEK-6",
    pages: [
      { label: "Final Designs", href: "https://www.figma.com/design/JNCLzwdxmFzhbFMgM5Gqzx?node-id=1-146" },
    ],
  },
  {
    title: "04. Transfers",
    href: "https://www.figma.com/design/eIcGh1wDvXH8j4jDqJFhxS",
    pages: [
      { label: "New Experience + Landing + Rules", href: "https://www.figma.com/design/eIcGh1wDvXH8j4jDqJFhxS?node-id=2-174401" },
      { label: "SAB Transfer", href: "https://www.figma.com/design/eIcGh1wDvXH8j4jDqJFhxS?node-id=2-55287" },
      { label: "Local transfer", href: "https://www.figma.com/design/eIcGh1wDvXH8j4jDqJFhxS?node-id=47-5716" },
      { label: "Quick Transfers", href: "https://www.figma.com/design/eIcGh1wDvXH8j4jDqJFhxS?node-id=2-117468" },
      { label: "International Transfers", href: "https://www.figma.com/design/eIcGh1wDvXH8j4jDqJFhxS?node-id=2-141951" },
      { label: "My Account Transfer", href: "https://www.figma.com/design/eIcGh1wDvXH8j4jDqJFhxS?node-id=2-181219" },
      { label: "HSBC", href: "https://www.figma.com/design/eIcGh1wDvXH8j4jDqJFhxS?node-id=2-204886" },
      { label: "Add Manage Beneficiaries", href: "https://www.figma.com/design/eIcGh1wDvXH8j4jDqJFhxS?node-id=2-31" },
      { label: "Transfer History", href: "https://www.figma.com/design/eIcGh1wDvXH8j4jDqJFhxS?node-id=2-172141" },
      { label: "Int. Transfer History & Transaction Cancellation", href: "https://www.figma.com/design/eIcGh1wDvXH8j4jDqJFhxS?node-id=2-168012" },
      { label: "Request to Pay", href: "https://www.figma.com/design/eIcGh1wDvXH8j4jDqJFhxS?node-id=2-68725" },
      { label: "Scheduled Transfers", href: "https://www.figma.com/design/eIcGh1wDvXH8j4jDqJFhxS?node-id=2-89151" },
      { label: "Split", href: "https://www.figma.com/design/eIcGh1wDvXH8j4jDqJFhxS?node-id=2-100144" },
      { label: "Favourite Transfers", href: "https://www.figma.com/design/eIcGh1wDvXH8j4jDqJFhxS?node-id=2-138769" },
      { label: "Request for information", href: "https://www.figma.com/design/eIcGh1wDvXH8j4jDqJFhxS?node-id=2-195269" },
      { label: "Quick Transfer Registration", href: "https://www.figma.com/design/eIcGh1wDvXH8j4jDqJFhxS?node-id=2-197652" },
      { label: "Manage Transfer Limit", href: "https://www.figma.com/design/eIcGh1wDvXH8j4jDqJFhxS?node-id=2-208336" },
      { label: "Charity", href: "https://www.figma.com/design/eIcGh1wDvXH8j4jDqJFhxS?node-id=47-29163" },
      { label: "Hybrid ISO", href: "https://www.figma.com/design/eIcGh1wDvXH8j4jDqJFhxS?node-id=51-75186" },
      { label: "Add Beneficiary Type -WPBRMB2026-6338", href: "https://www.figma.com/design/eIcGh1wDvXH8j4jDqJFhxS?node-id=51-85222" },
    ],
  },
  {
    title: "05. Finance Hub",
    href: "https://www.figma.com/design/hwmmpp5rO7P5Mhs3hu91Wj/04.-Finance-Hub?m=auto&t=DIliarJOnp3WZHEK-6",
    pages: [
      { label: "Finance Hub & New Finance Applications", href: "https://www.figma.com/design/hwmmpp5rO7P5Mhs3hu91Wj?node-id=1128-16971" },
      { label: "Finance Product Page & Services", href: "https://www.figma.com/design/hwmmpp5rO7P5Mhs3hu91Wj?node-id=1381-46992" },
      { label: "Micro Lending", href: "https://www.figma.com/design/hwmmpp5rO7P5Mhs3hu91Wj?node-id=1381-46993" },
    ],
  },
  {
    title: "06. Accounts Hub",
    href: "https://www.figma.com/design/S0PYt029KrVs9SZ8mvNj0z/05.-Accounts-Hub?m=auto&t=DIliarJOnp3WZHEK-6",
    pages: [
      { label: "Accounts Hub, Dashboard and Actions and Close", href: "https://www.figma.com/design/S0PYt029KrVs9SZ8mvNj0z?node-id=656-12869" },
      { label: "Current Accounts", href: "https://www.figma.com/design/S0PYt029KrVs9SZ8mvNj0z?node-id=787-122490" },
      { label: "Savings Accounts", href: "https://www.figma.com/design/S0PYt029KrVs9SZ8mvNj0z?node-id=787-122491" },
      { label: "Deposit Accounts", href: "https://www.figma.com/design/S0PYt029KrVs9SZ8mvNj0z?node-id=675-12867" },
      { label: "Wafer Account", href: "https://www.figma.com/design/S0PYt029KrVs9SZ8mvNj0z?node-id=977-49020" },
      { label: "Global View Account", href: "https://www.figma.com/design/S0PYt029KrVs9SZ8mvNj0z?node-id=983-222401" },
      { label: "Joint Account", href: "https://www.figma.com/design/S0PYt029KrVs9SZ8mvNj0z?node-id=983-222399" },
      { label: "Safety Deposit Locker Account", href: "https://www.figma.com/design/S0PYt029KrVs9SZ8mvNj0z?node-id=983-222400" },
      { label: "Passbook Savings Account", href: "https://www.figma.com/design/S0PYt029KrVs9SZ8mvNj0z?node-id=983-224735" },
      { label: "Securities Cash Account", href: "https://www.figma.com/design/S0PYt029KrVs9SZ8mvNj0z?node-id=983-224736" },
    ],
  },
  {
    title: "07. Investments Hub",
    href: "https://www.figma.com/design/gk83hO5b1Lf99O3dKXBwo0/06.-Investments-HUB?m=auto&t=DIliarJOnp3WZHEK-6",
    pages: [
      { label: "All Investments Hub", href: "https://www.figma.com/design/gk83hO5b1Lf99O3dKXBwo0?node-id=1-194" },
    ],
  },
  {
    title: "08. Open Banking",
    href: "https://www.figma.com/design/pelXU9uvmLG2T7uCAoJNZ3/07.-Open-Banking?m=auto&t=DIliarJOnp3WZHEK-6",
    pages: [
      { label: "Final Designs", href: "https://www.figma.com/design/pelXU9uvmLG2T7uCAoJNZ3?node-id=42-13327" },
      { label: "Checklist requirements", href: "https://www.figma.com/design/pelXU9uvmLG2T7uCAoJNZ3?node-id=1432-32872" },
      { label: "Checklist requirements V2 - In progress", href: "https://www.figma.com/design/pelXU9uvmLG2T7uCAoJNZ3?node-id=4975-70195" },
    ],
  },
  {
    title: "09. Prelogin Login",
    href: "https://www.figma.com/design/X89n3NF9FMj1KoxCbhc5NH/08.-Prelogin-Login?m=auto&t=DIliarJOnp3WZHEK-6",
    pages: [
      { label: "PreLogin & Login", href: "https://www.figma.com/design/X89n3NF9FMj1KoxCbhc5NH?node-id=330-5880" },
      { label: "DSP Enhancement", href: "https://www.figma.com/design/X89n3NF9FMj1KoxCbhc5NH?node-id=5954-72176" },
    ],
  },
  {
    title: "10. Profile, Settings & Notifications",
    href: "https://www.figma.com/design/B7olVkp4ciUQZcA8qnB5X1/09.-Profile--Settings---Notifications?m=auto&t=DIliarJOnp3WZHEK-6",
    pages: [
      { label: "Profile", href: "https://www.figma.com/design/B7olVkp4ciUQZcA8qnB5X1?node-id=11-23555" },
      { label: "Login Methods", href: "https://www.figma.com/design/B7olVkp4ciUQZcA8qnB5X1?node-id=1739-22" },
      { label: "Notifications & in app notifications", href: "https://www.figma.com/design/B7olVkp4ciUQZcA8qnB5X1?node-id=913-23775" },
      { label: "KYC", href: "https://www.figma.com/design/B7olVkp4ciUQZcA8qnB5X1?node-id=11-51664" },
      { label: "Search", href: "https://www.figma.com/design/B7olVkp4ciUQZcA8qnB5X1?node-id=11-79773" },
      { label: "Help - RM", href: "https://www.figma.com/design/B7olVkp4ciUQZcA8qnB5X1?node-id=11-107882" },
    ],
  },
  {
    title: "11. SAB Store 2.0",
    href: "https://www.figma.com/design/T8ykDCev9zkE7urEQmcray/10.-SAB-Store-2.0?m=auto&t=DIliarJOnp3WZHEK-6",
    pages: [
      { label: "All SAB Store/For You Journeys", href: "https://www.figma.com/design/T8ykDCev9zkE7urEQmcray?node-id=6143-51315" },
      { label: "Email Template", href: "https://www.figma.com/design/T8ykDCev9zkE7urEQmcray?node-id=2136-32862" },
      { label: "Thank You Card", href: "https://www.figma.com/design/T8ykDCev9zkE7urEQmcray?node-id=11707-66127" },
    ],
  },
  {
    title: "12. Family Banking",
    href: "https://www.figma.com/design/l1oKitRQtp2GYJmMdNyuX3/11.-Family-Banking?m=auto&t=DIliarJOnp3WZHEK-6",
    pages: [
      { label: "Family Dashboard", href: "https://www.figma.com/design/l1oKitRQtp2GYJmMdNyuX3?node-id=4781-176644" },
      { label: "Multiple Accounts", href: "https://www.figma.com/design/l1oKitRQtp2GYJmMdNyuX3?node-id=7338-153414" },
      { label: "Phase 2", href: "https://www.figma.com/design/l1oKitRQtp2GYJmMdNyuX3?node-id=7338-116868" },
      { label: "Minor app", href: "https://www.figma.com/design/l1oKitRQtp2GYJmMdNyuX3?node-id=6363-147968" },
    ],
  },
  {
    title: "13. SAB 360",
    href: "https://www.figma.com/design/prEUW4RGDaS0DKYhl6jJss",
    pages: [
      { label: "Landing Page", href: "https://www.figma.com/design/prEUW4RGDaS0DKYhl6jJss?node-id=9-3" },
      { label: "Expenses", href: "https://www.figma.com/design/prEUW4RGDaS0DKYhl6jJss?node-id=9-4" },
      { label: "Cash Wallet", href: "https://www.figma.com/design/prEUW4RGDaS0DKYhl6jJss?node-id=402-24807" },
      { label: "Budget", href: "https://www.figma.com/design/prEUW4RGDaS0DKYhl6jJss?node-id=11-3780" },
      { label: "My Activity", href: "https://www.figma.com/design/prEUW4RGDaS0DKYhl6jJss?node-id=128-4208" },
      { label: "Tags", href: "https://www.figma.com/design/prEUW4RGDaS0DKYhl6jJss?node-id=11-3774" },
      { label: "Net Worth", href: "https://www.figma.com/design/prEUW4RGDaS0DKYhl6jJss?node-id=11-3776" },
      { label: "Financial Challenges", href: "https://www.figma.com/design/prEUW4RGDaS0DKYhl6jJss?node-id=11-3777" },
      { label: "Life Goals", href: "https://www.figma.com/design/prEUW4RGDaS0DKYhl6jJss?node-id=11-3778" },
      { label: "Insights Factory", href: "https://www.figma.com/design/prEUW4RGDaS0DKYhl6jJss?node-id=1425-22" },
      { label: "Carbon Insight", href: "https://www.figma.com/design/prEUW4RGDaS0DKYhl6jJss?node-id=15001-1858" },
    ],
  },
  {
    title: "14. Microfinance BNPL",
    href: "https://www.figma.com/design/Ajp9AkDG8AjJQOAwPPe4ri/14.-Microfinance---BNPL?node-id=1-1241&t=H7AXF8xHzX2dVnHj-1",
    pages: [
      { label: "ML Amazon Web Responsive", href: "https://www.figma.com/design/Ajp9AkDG8AjJQOAwPPe4ri/14.-Microfinance---BNPL?node-id=1-30" },
      { label: "ETB In App Servicing", href: "https://www.figma.com/design/Ajp9AkDG8AjJQOAwPPe4ri/14.-Microfinance---BNPL?node-id=1-5037" },
    ],
  },
  {
    title: "15. Household",
    href: "https://www.figma.com/design/60QnQPG8Z2MIbyTObPWJNK/Household?node-id=0-1",
    pages: [
      { label: "Household Payments all Journey", href: "https://www.figma.com/design/60QnQPG8Z2MIbyTObPWJNK/Household?node-id=0-1" },
    ],
  },
];
