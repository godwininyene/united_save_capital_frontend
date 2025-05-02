import {transfer_money,data_trends, investment_data,people01, sms, action,people02,mortgage, verified,growth, loan,car_loan,  pay_loan, student_loan, borrowing, people03, facebook, instagram, linkedin, twitter, airbnb, binance, coinbase, dropbox, bitcoin, shield, exchange  } from "../assets";
import { FiRefreshCw, FiCreditCard, FiSend } from "react-icons/fi";
import { FaUniversity } from "react-icons/fa";
export const navLinks = [
  {
    id: "/",
    title: "Home",
  },
  {
    id: "about",
    title: "About Us",
  },
  {
    id: "loans",
    title: "Loans",
  },
  {
    id: "services",
    title: "Services",
  },

  {
    id: "contact_us",
    title: "Contact Us",
  }
];

export const features = [
  {
    id: "feature-1",
    icon: exchange,
    title: "Personal Loan",
    content:
      "We offer excellent loan options with minimal interest rates to help you meet your financial needs. Available to everyone, regardless of your status.",
  },
  {
    id: "feature-2",
    icon: shield,
    title: "100% Secured",
    content:
      "A highly secure and well-monitored way to save, invest, and transfer your funds with complete assurance.",
  },
  {
    id: "feature-3",
    icon: bitcoin,
    title: "Digital Assets",
    content:
      "Digital assets, such as Bitcoin, are a growing investment class. Our digital asset fund provides investors with access to Bitcoin and other digital assets.",
  },
];

export const support =[
  {
    id: "support-1",
    icon: transfer_money,
    title: "Transfer Money",
    content:
      "Our digital platform allows you to seamlessly transfer money to friends and family worldwide.",
  },

  {
    id: "feature-2",
    icon: investment_data,
    title: "Exchange Rate Chart",
    content:
      "Stay updated on market trends and make informed trading decisions with our real-time currency charts.",
  },

  {
    id: "feature-3",
    icon: data_trends,
    title: "Create Account",
    content:
      "Open a free digital bank account today and enjoy seamless global money transfers.",
  },
]

export const feedback = [
  {
    id: "feedback-1",
    content:
      "Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.",
    name: "Herman Jensen",
    title: "Founder & Leader",
    img: people01,
  },
  {
    id: "feedback-2",
    content:
      "Money makes your life easier. If you're lucky to have it, you're lucky.",
    name: "Steve Mark",
    title: "Founder & Leader",
    img: people02,
  },
  {
    id: "feedback-3",
    content:
      "It is usually people in the money business, finance, and international trade that are really rich.",
    name: "Kenn Gallagher",
    title: "Founder & Leader",
    img: people03,
  },
];

export const stats = [
  {
    id: "stats-1",
    title: "User Active",
    value: "3800+",
  },
  {
    id: "stats-2",
    title: "Trusted by Company",
    value: "230+",
  },
  {
    id: "stats-3",
    title: "Transaction",
    value: "$230M+",
  },
];

export const why = [
  {
    id: "why-1",
    title: "Be Genuine",
    icon: verified,
    description: "We prioritize transparency and integrity in all financial transactions, ensuring our customers can bank with confidence and trust."
  },

  {
    id: "why-2",
    title: "Invest in Growth",
    icon: growth,
    description: "Your financial future matters. We provide tailored savings, investment, and loan options to help you grow your wealth and achieve financial stability."
  },

  {
    id: "why-3",
    title: "Distill the SMS",
    icon: sms,
    description: "We simplify banking communication, delivering clear and concise financial updates, alerts, and insights to keep you informed at all times."
  },

  {
    id: "why-4",
    title: "Take Action",
    icon: action,
    description: "Seize financial opportunities with our seamless banking solutions. From instant transfers to investment plans, we empower you to make smart financial moves effortlessly."
  },
];


export const loansStats = [
  {
    id: "stats-1",
    title: "Flexible Loan",
    icon: "🔄",
    description: "Get customized loan options with flexible repayment terms to suit your financial needs."
  },
  {
    id: "stats-2",
    title: "Fixed Rates",
    icon: "💰",
    description: "Enjoy stable interest rates with no surprises, making your repayments predictable and manageable."
  },
  {
    id: "stats-3",
    title: "No Prepayment",
    icon: "✅",
    description: "Pay off your loan early without extra charges, giving you complete financial freedom."
  },
];

export const loans = [
  {
    id: "loan-1",
    title: "Personal Loan",
    icon: loan,
    description: "Get quick access to funds for any personal expense with flexible repayment options."
  },
  {
    id: "loan-2",
    title: "Payday Loan",
    icon:  pay_loan ,
    description: "Short-term loans to cover urgent expenses until your next paycheck arrives."
  },
  {
    id: "loan-3",
    title: "Installment Loan",
    icon: borrowing,
    description: "Borrow a fixed amount and repay it in manageable monthly installments over time."
  },
  {
    id: "loan-4",
    title: "Student Loans",
    icon:student_loan,
    description: "Finance your education with low-interest student loans and flexible repayment plans."
  },
  {
    id: "loan-5",
    title: "Auto Loans",
    icon:car_loan,
    description: "Get competitive rates on car loans to purchase your dream vehicle hassle-free."
  },
  {
    id: "loan-6",
    title: "Mortgage Loan",
    icon: mortgage,
    description: "Secure a home loan with affordable rates and repayment options tailored to your needs."
  },
];

export const services = [
  {
    id: "service-1",
    title: "Loan",
    icon: FiRefreshCw, 
    description:
      "From time to time in life and business, we find ourselves needing a little or a lot more money than we have to meet certain pressing financial goals. At Bluewin Credit Union our loan offerings provide a fall-back position to secure the funds you need.",
  },
  {
    id: "service-2",
    title: "Cards",
    icon: FiCreditCard, 
    description:
      "Our MasterCard and Visa debit cards provide you 24-hour access to your current and savings account. The debit card is not just an ATM Card, it also enables you to make cashless purchases through POS, WEB, and ATM anywhere in the world.",
  },
  {
    id: "service-3",
    title: "Bank Transfer",
    icon: FiSend, 
    description:
      "With this transfer platform you can transfer foreign currency to any bank account in the world. You can transfer up to the equivalent of ten thousand US Dollars daily. You must have your hardware token to authenticate all transfers on Internet Banking.",
  },
  {
    id: "service-4",
    title: "Private Banking",
    icon: FaUniversity, 
    description:
      "One of our strongest points is developing and implementing investment strategies to exceed your expectations, employing a mix of proven proficiency and cutting-edge solutions. Always working with you to execute the plan, you can rest assured that your long-term objectives will steer your portfolio towards the achievement of your ultimate goals.",
  },
];

export const steps = [
  {
    id: "step-1",
    title: "Check rate",
    icon: "🔄",
    description: "Fill out a form to check your rate in minutes."
  },
  {
    id: "step-2",
    title: "Verify information",
    icon: "💰",
    description: "90% of loans are fully automated."
  },
  {
    id: "step-3",
    title: "Get money",
    icon: "✅",
    description: "99% of funds are sent just 1 business day."
  },
];

export const faqs = [
  {
    id: 0,
    question: "How does United Capital Bank work?",
    ans: "United Capital Bank is a digital-first financial institution that offers secure and seamless banking services online. We provide savings accounts, loan services, fund transfers, and investment opportunities, all accessible via our web and mobile platforms. Our goal is to make banking easy, fast, and accessible from anywhere in the world."
  },
  {
    id: 1,
    question: "What services do you offer?",
    ans: "We offer a range of banking services, including personal and business accounts, instant money transfers, bill payments, savings plans, loans, and investment opportunities."
  },
  {
    id: 2,
    question: "Is my money safe with United Capital Bank?",
    ans: "Yes, we use industry-standard encryption and multi-factor authentication to ensure the security of your transactions and personal information. Your funds are insured and protected against fraud."
  },
  {
    id: 3,
    question: "How can I open an account?",
    ans: "Opening an account with us is easy! Simply visit our website or download our mobile app, click on 'Sign Up,' and follow the registration steps by providing the required details. Your account will be ready in minutes."
  },
  {
    id: 4,
    question: "What are the requirements to open an account?",
    ans: "To open an account, you need a valid government-issued ID, an active phone number, and an email address. Some account types may require additional verification for security purposes."
  },
  {
    id: 5,
    question: "How do I transfer money?",
    ans: "Log into your account, navigate to the 'Transfers' section, enter the recipient’s details, specify the amount, and confirm the transaction. Your money will be sent instantly or within a short processing time."
  },
  {
    id: 6,
    question: "Are there any transaction fees?",
    ans: "We offer free transfers between United Capital Bank accounts. However, transactions to external banks may incur a small service fee, which will be displayed before you confirm your transfer."
  },
  {
    id: 7,
    question: "How do I reset my password?",
    ans: "If you forgot your password, click on 'Forgot Password' on the login page, enter your registered email or phone number, and follow the instructions to reset your password securely."
  },
  {
    id: 8,
    question: "What should I do if I suspect fraud on my account?",
    ans: "If you notice any suspicious activity, immediately contact our customer support team via phone or email. You can also temporarily freeze your account from the security settings in your dashboard."
  },
  {
    id: 9,
    question: "What hours are customer support available?",
    ans: "Our customer support team is available 24/7 to assist you with any inquiries or issues. You can reach us via live chat, email, or phone."
  }
];





export const footerLinks = [
  {
    title: "Quick Links",
    links: [
      {
        name: "Content",
        link: "https://www.hoobank.com/content/",
      },
      {
        name: "How it Works",
        link: "https://www.hoobank.com/how-it-works/",
      },
      {
        name: "Create",
        link: "https://www.hoobank.com/create/",
      },
      {
        name: "Explore",
        link: "https://www.hoobank.com/explore/",
      },
      {
        name: "Terms & Services",
        link: "https://www.hoobank.com/terms-and-services/",
      },
    ],
  },
  {
    title: "Help Center",
    links: [
      {
        name: "Help Center",
        link: "https://www.hoobank.com/help-center/",
      },
      {
        name: "Partners",
        link: "https://www.hoobank.com/partners/",
      },
      {
        name: "Suggestions",
        link: "https://www.hoobank.com/suggestions/",
      },
      {
        name: "Blog",
        link: "https://www.hoobank.com/blog/",
      },
      {
        name: "Newsletters",
        link: "https://www.hoobank.com/newsletters/",
      },
    ],
  },
  // {
  //   title: "Contact Info",
  //   links: [
  //     {
  //       name: "Our Partner",
  //       link: "https://www.hoobank.com/our-partner/",
  //     },
  //     {
  //       name: "Become a Partner",
  //       link: "https://www.hoobank.com/become-a-partner/",
  //     },
  //   ],
  // },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];

export const clients = [
  {
    id: "client-1",
    logo: airbnb,
  },
  {
    id: "client-2",
    logo: binance,
  },
  {
    id: "client-3",
    logo: coinbase,
  },
  {
    id: "client-4",
    logo: dropbox,
  },
];