
// Mock intent detection data and logic

// Define standard intent types
export type Intent = {
  name: string;
  confidence: number;
  description: string;
  color: string;
};

// Predefined intents for the system
export const intentCategories = {
  issue_reporting: {
    name: "Issue Reporting",
    description: "Customer is reporting a problem with the product or service",
    color: "bg-red-500"
  },
  account_inquiry: {
    name: "Account Inquiry",
    description: "Customer is asking about account status, details, or management",
    color: "bg-blue-500"
  },
  billing_question: {
    name: "Billing Question",
    description: "Customer has questions about billing, charges, or payment",
    color: "bg-green-500"
  },
  product_information: {
    name: "Product Information",
    description: "Customer is seeking information about products or services",
    color: "bg-purple-500"
  },
  feature_request: {
    name: "Feature Request",
    description: "Customer is suggesting or requesting new features",
    color: "bg-yellow-500"
  },
  general_inquiry: {
    name: "General Inquiry",
    description: "General questions not falling into other categories",
    color: "bg-gray-500"
  },
  cancellation: {
    name: "Cancellation",
    description: "Customer wants to cancel a service or subscription",
    color: "bg-orange-500"
  },
  technical_support: {
    name: "Technical Support",
    description: "Customer needs help with technical issues",
    color: "bg-cyan-500"
  }
};

type IntentCategory = keyof typeof intentCategories;

// Sample queries for demonstration
export const sampleQueries = [
  "My subscription is not working and I'd like to cancel it",
  "I need information about your premium plan and how to upgrade my account",
  "I was charged twice last month and I'm having trouble logging in",
  "Do you offer discounts for annual payments? Also, can I add more users to my current plan?",
  "The app keeps crashing after the latest update. Can you help me fix this issue?"
];

// Mock intent analysis function
export const analyzeQuery = (query: string): Intent[] => {
  // In a real application, this would call an AI model API
  // For demo purposes, we'll use a keyword-based approach
  
  const normalizedQuery = query.toLowerCase();
  const results: Intent[] = [];
  
  // Check for each intent type based on keywords
  const keywordMap: Record<IntentCategory, string[]> = {
    issue_reporting: ['problem', 'issue', 'broken', 'not working', 'error', 'bug', 'trouble', 'fix'],
    account_inquiry: ['account', 'login', 'password', 'profile', 'setup', 'sign in', 'access'],
    billing_question: ['bill', 'charge', 'payment', 'invoice', 'subscription', 'cost', 'price', 'discount', 'refund', 'charged'],
    product_information: ['how does', 'features', 'details', 'information', 'specs', 'plan', 'offer', 'service'],
    feature_request: ['add', 'new feature', 'suggestion', 'should have', 'improve', 'update', 'upgrade'],
    general_inquiry: ['question', 'help', 'support', 'assistance', 'guide', 'explain'],
    cancellation: ['cancel', 'stop', 'end', 'terminate', 'discontinue'],
    technical_support: ['technical', 'crash', 'bug', 'glitch', 'error', 'not loading', 'slow', 'performance']
  };
  
  // Calculate confidence for each intent
  Object.entries(keywordMap).forEach(([intent, keywords]) => {
    const intentKey = intent as IntentCategory;
    let matchCount = 0;
    
    // Count keyword matches
    keywords.forEach(keyword => {
      if (normalizedQuery.includes(keyword)) {
        matchCount++;
      }
    });
    
    // Calculate confidence based on keyword matches
    if (matchCount > 0) {
      const baseConfidence = 0.3 + (matchCount * 0.15);
      // Add some randomness to make it more realistic
      const confidence = Math.min(baseConfidence + (Math.random() * 0.2), 0.98);
      
      if (confidence > 0.35) {
        results.push({
          name: intentCategories[intentKey].name,
          description: intentCategories[intentKey].description,
          confidence,
          color: intentCategories[intentKey].color
        });
      }
    }
  });
  
  // Sort by confidence
  results.sort((a, b) => b.confidence - a.confidence);
  
  // If no intents detected, add general inquiry with low confidence
  if (results.length === 0) {
    results.push({
      name: intentCategories.general_inquiry.name,
      description: intentCategories.general_inquiry.description,
      confidence: 0.4 + (Math.random() * 0.2),
      color: intentCategories.general_inquiry.color
    });
  }
  
  // Limit to top 3 intents for clarity
  return results.slice(0, 3);
};

// Function to get a random sample query
export const getRandomSampleQuery = (): string => {
  const randomIndex = Math.floor(Math.random() * sampleQueries.length);
  return sampleQueries[randomIndex];
};
