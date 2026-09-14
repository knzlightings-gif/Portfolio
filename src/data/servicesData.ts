export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  fullDescription: string;
  icon: string;
  features: string[];
  deliverables: string[];
  status: string;
  updatedAt?: string;
  createdAt?: string;
}

export const defaultServices: ServiceItem[] = [
  {
    id: "erp",
    title: "ERP Development",
    tagline: "Custom Enterprise Resource Planning Systems Tailored for Growing Businesses",
    description: "Custom ERP systems for managing sales, purchases, inventory, accounts and business operations.",
    fullDescription: "Managing business operations manually or using fragmented software leads to errors, lost revenue, and operational bottlenecks. I build customized ERP software built specifically around your business rules, workflows, and reporting needs. From inventory tracking to double-entry accounting and sales automation, everything stays synchronized in real time.",
    icon: "Database",
    features: [
      "Custom Inventory & Stock Management",
      "Automated Purchase Orders & Supplier Invoicing",
      "Real-Time Sales Ledger & Customer Invoicing",
      "Double-Entry Financial Accounting & Expense Tracking",
      "Role-Based Access Control for Employees",
      "Custom PDF Reports & Exportable Dashboards"
    ],
    deliverables: [
      "Fully Configured Cloud / On-Premise ERP System",
      "Role-Based Access & Security Setup",
      "Data Migration from Excel / Legacy Database",
      "User Training & Video Guides",
      "Ongoing Support & Feature Maintenance"
    ],
    status: "Available for projects"
  },
  {
    id: "web-apps",
    title: "Web Applications",
    tagline: "Modern, Fast & Scalable Web Applications Built for High Business Impact",
    description: "Modern web-based business applications, dashboards and management systems.",
    fullDescription: "Off-the-shelf software often comes with unnecessary bloat and rigid workflows. I build bespoke web applications designed for maximum speed, clean user experience, and seamless business workflows. Whether you need a customer portal, internal management system, or multi-tenant web platform, it is crafted using modern full-stack web technologies.",
    icon: "LayoutDashboard",
    features: [
      "Custom Web Dashboards & Portals",
      "Responsive & Mobile-Optimized User Interfaces",
      "Secure Authentication & Role Management",
      "Real-time Operations Tracking & Data Sync",
      "Scalable Database & Cloud Backend",
      "Third-Party API Integration & Webhooks"
    ],
    deliverables: [
      "Production-Ready Web Application",
      "Cross-Platform & Mobile Browser Support",
      "Admin Dashboard & Management Console",
      "Clean Source Code & Technical Documentation"
    ],
    status: "Available for projects"
  },
  {
    id: "automation",
    title: "Business Automation",
    tagline: "Eliminate Repetitive Workflows & Human Errors with Smart Digital Automation",
    description: "Replace repetitive manual processes with simple digital workflows.",
    fullDescription: "Manual data entry, manual follow-ups, and repetitive copy-pasting waste hundreds of operational hours each month. I design and build automated digital workflows that handle routine tasks instantly behind the scenes. From auto-generating invoices to triggering instant WhatsApp/Email alerts and syncing data across platforms, automation lets your business scale effortlessly.",
    icon: "Workflow",
    features: [
      "Automated WhatsApp & Email Notifications",
      "Smart Event Triggers & Automated Reminders",
      "Excel/CSV Batch Processing & Auto-Import",
      "Multi-System Data Synchronization",
      "Scheduled Background Jobs & Audits",
      "Zero Manual Error Workflow Execution"
    ],
    deliverables: [
      "Custom Workflow Automation Middleware",
      "WhatsApp/SMS & Email Gateway Integration",
      "Error Alert & Activity Monitoring Dashboard",
      "Automated Scheduled Cron Jobs"
    ],
    status: "Available for projects"
  },
  {
    id: "ai",
    title: "AI-Assisted Development",
    tagline: "Accelerated Software Iteration Powered by Modern AI-Assisted Architecture",
    description: "Modern AI-powered development workflows that help build and iterate software faster while maintaining high quality.",
    fullDescription: "Leveraging cutting-edge AI coding capabilities alongside robust human engineering principles allows me to architect, develop, and deploy complex software in a fraction of traditional timelines. By automating boilerplate generation, test writing, and optimization, I focus on crafting top-tier user experience and rock-solid business logic.",
    icon: "Cpu",
    features: [
      "Rapid Prototype to Production Deployment",
      "Smart AI Assistant Integration into Software",
      "Natural Language Data Querying & Search",
      "Intelligent Document & Invoice Parsing",
      "High Performance & Scalable Codebases",
      "Clean Code Architecture & Test Suite"
    ],
    deliverables: [
      "AI-Enhanced Application Architecture",
      "Custom Prompt / AI Agent Integrations",
      "Intelligent Data Extraction Engine",
      "Production Cloud Deployment"
    ],
    status: "Available for projects"
  },
  {
    id: "api",
    title: "API Integrations",
    tagline: "Seamlessly Connect Business Systems, Payment Gateways & External Tools",
    description: "Connecting your business software with third-party services, payment gateways, and external tools.",
    fullDescription: "Businesses rely on multiple software platforms to run day-to-day operations. I build robust RESTful APIs, Webhooks, and middleware integrations that connect your ERP or Web Application to external services like payment gateways (Stripe, JazzCash, EasyPaisa), shipping APIs, CRM tools, and WhatsApp Business API.",
    icon: "Link",
    features: [
      "Payment Gateway Integrations (Card & Mobile Wallet)",
      "WhatsApp Business & SMS Notification APIs",
      "Custom REST APIs & Webhook Middleware",
      "Webhook Listeners & Real-Time Event Sync",
      "Third-Party CRM & Accounting Integrations",
      "Secure Authentication (OAuth, JWT, API Keys)"
    ],
    deliverables: [
      "Fully Tested Integration Middleware",
      "Webhook Handlers & Logging Systems",
      "API Documentation & Endpoints",
      "Sandbox & Production Configuration"
    ],
    status: "Available for projects"
  },
  {
    id: "analytics",
    title: "Data Dashboards",
    tagline: "Turn Complex Raw Data into Actionable Visual Business Insights",
    description: "Visualizing complex business data into simple, actionable insights and reporting dashboards.",
    fullDescription: "Data is useless if it is trapped in messy spreadsheets or buried across multiple databases. I create intuitive, real-time analytics dashboards that give business owners instant clarity on sales, inventory turnover, revenue growth, customer retention, and key performance indicators (KPIs).",
    icon: "BarChart",
    features: [
      "Interactive Real-time Visual Charts & Graphs",
      "Key Performance Indicator (KPI) Tracking",
      "Custom Filterable Date Ranges & Metrics",
      "Excel, CSV & PDF One-Click Export",
      "Role-Based Executive & Manager Dashboards",
      "Automated Daily/Weekly Email Reports"
    ],
    deliverables: [
      "Custom Visual Analytics Dashboard",
      "Export Engine (PDF/Excel)",
      "Real-time Database Query Engine",
      "User Permission Rules"
    ],
    status: "Available for projects"
  }
];
