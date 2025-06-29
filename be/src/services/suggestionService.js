import { sendSuggestionEmail } from "./emailServiceSuggesstion.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import { buildJobSuggestionsEmail } from "../services/template.js";

// Job categories with their keywords and required skills
const JOB_CATEGORIES = {
  IT: {
    keywords: [
      "developer",
      "engineer",
      "programmer",
      "it",
      "software",
      "tech",
      "system",
    ],
    subCategories: {
      Frontend: {
        mustHaveSkills: ["html", "css", "javascript"],
        commonSkills: ["react", "vue", "angular", "typescript", "web"],
        titleKeywords: [
          "frontend",
          "front-end",
          "front end",
          "ui",
          "web developer",
          "client side",
          "react",
          "vue",
          "angular",
        ],
        excludeKeywords: ["backend", "devops", "cloud"],
      },
      Backend: {
        mustHaveSkills: ["api", "database", "server"],
        commonSkills: ["nodejs", "python", "java", "php", "sql", "mongodb"],
        titleKeywords: [
          "backend",
          "back-end",
          "back end",
          "server",
          "api",
          "nodejs",
          "java",
          "python",
        ],
        excludeKeywords: ["frontend", "mobile"],
      },
      Fullstack: {
        mustHaveSkills: ["javascript", "database"],
        commonSkills: ["nodejs", "react", "api", "mongodb", "sql"],
        titleKeywords: [
          "fullstack",
          "full-stack",
          "full stack",
          "web developer",
          "software engineer",
        ],
        excludeKeywords: ["intern", "mobile"],
      },
      DevOps: {
        mustHaveSkills: ["cloud", "deployment"],
        commonSkills: ["aws", "docker", "kubernetes", "jenkins", "ci/cd"],
        titleKeywords: [
          "devops",
          "sre",
          "platform",
          "cloud",
          "infrastructure",
          "aws",
          "azure",
          "gcp",
        ],
        excludeKeywords: ["frontend", "mobile", "ui"],
      },
    },
  },
  Marketing: {
    keywords: [
      "marketing",
      "brand",
      "advertising",
      "social media",
      "content",
      "pr",
      "communications",
    ],
    subCategories: {
      Digital: {
        mustHaveSkills: ["digital marketing", "social media", "analytics"],
        commonSkills: [
          "facebook ads",
          "google ads",
          "seo",
          "content marketing",
          "email marketing",
        ],
        titleKeywords: [
          "digital marketing",
          "online marketing",
          "social media",
          "seo",
          "sem",
        ],
        excludeKeywords: ["traditional", "offline"],
      },
      Brand: {
        mustHaveSkills: ["branding", "marketing strategy", "campaign"],
        commonSkills: [
          "brand management",
          "market research",
          "creative",
          "campaign planning",
        ],
        titleKeywords: ["brand", "marketing manager", "marketing executive"],
        excludeKeywords: ["sales", "technical"],
      },
      PR: {
        mustHaveSkills: [
          "public relations",
          "communications",
          "media relations",
        ],
        commonSkills: ["press release", "media planning", "crisis management"],
        titleKeywords: [
          "pr",
          "public relations",
          "communications",
          "corporate communications",
        ],
        excludeKeywords: ["sales", "technical"],
      },
    },
  },
  Finance: {
    keywords: [
      "finance",
      "accounting",
      "banking",
      "investment",
      "audit",
      "tax",
    ],
    subCategories: {
      Accounting: {
        mustHaveSkills: ["accounting", "financial reporting", "tax"],
        commonSkills: ["excel", "erp", "reconciliation", "bookkeeping"],
        titleKeywords: ["accountant", "accounting", "finance", "auditor"],
        excludeKeywords: ["sales", "marketing"],
      },
      Banking: {
        mustHaveSkills: ["banking", "financial services", "risk management"],
        commonSkills: [
          "credit analysis",
          "loan processing",
          "banking operations",
        ],
        titleKeywords: [
          "banker",
          "bank",
          "credit",
          "loan",
          "relationship manager",
        ],
        excludeKeywords: ["marketing", "engineering"],
      },
      Investment: {
        mustHaveSkills: [
          "investment",
          "financial analysis",
          "portfolio management",
        ],
        commonSkills: ["equity research", "market analysis", "valuation"],
        titleKeywords: ["investment", "fund manager", "analyst", "trader"],
        excludeKeywords: ["admin", "support"],
      },
    },
  },
  HR: {
    keywords: ["hr", "human resources", "recruitment", "talent", "personnel"],
    subCategories: {
      Recruitment: {
        mustHaveSkills: ["recruiting", "talent acquisition", "interviewing"],
        commonSkills: ["sourcing", "ats", "linkedin recruiting", "job posting"],
        titleKeywords: [
          "recruiter",
          "talent acquisition",
          "recruitment",
          "hiring",
        ],
        excludeKeywords: ["admin", "engineering"],
      },
      HRManagement: {
        mustHaveSkills: ["hr management", "employee relations", "policy"],
        commonSkills: ["hris", "compensation", "benefits", "training"],
        titleKeywords: ["hr manager", "hr business partner", "hr generalist"],
        excludeKeywords: ["sales", "technical"],
      },
    },
  },
  Sales: {
    keywords: [
      "sales",
      "business development",
      "account management",
      "client",
      "b2b",
      "b2c",
      "nhân viên kinh doanh",
      "nhân viên tư vấn",
      "bán hàng",
    ],
    subCategories: {
      B2B: {
        mustHaveSkills: ["b2b sales", "account management", "negotiation"],
        commonSkills: ["crm", "sales strategy", "client relationship"],
        titleKeywords: [
          "account manager",
          "sales manager",
          "business development",
        ],
        excludeKeywords: ["retail", "engineer"],
      },
      B2C: {
        mustHaveSkills: ["b2c sales", "retail sales", "customer service"],
        commonSkills: ["pos", "merchandising", "customer relationship"],
        titleKeywords: ["sales executive", "retail", "sales representative"],
        excludeKeywords: ["b2b", "technical"],
      },
    },
  },
  Operations: {
    keywords: ["operations", "supply chain", "logistics", "procurement"],
    subCategories: {
      SupplyChain: {
        mustHaveSkills: ["supply chain", "inventory management", "procurement"],
        commonSkills: ["erp", "warehouse management", "vendor management"],
        titleKeywords: ["supply chain", "procurement", "purchasing", "buyer"],
        excludeKeywords: ["sales", "marketing"],
      },
      Logistics: {
        mustHaveSkills: ["logistics", "shipping", "warehouse"],
        commonSkills: [
          "transportation",
          "inventory",
          "customs",
          "distribution",
        ],
        titleKeywords: ["logistics", "warehouse", "shipping", "fleet"],
        excludeKeywords: ["development", "engineering"],
      },
    },
  },
};

const normalize = (str) => (str || "").toLowerCase().trim();

const extractResumeInfo = (resume) => {
  // Extract all relevant info from resume for matching
  const designation = normalize(resume.profileInfo.designation);
  const skills = (resume.skills || []).map((s) => normalize(s.name));
  const summary = normalize(resume.profileInfo.summary || "");
  const allText = [designation, ...skills, summary].join(" ");
  return { designation, skills, summary, allText };
};

const extractJobInfo = (job) => {
  const title = normalize(job.title);
  const requirements = (job.requirements || []).map((r) => normalize(r));
  const description = normalize(job.description || "");
  const allText = [title, ...requirements, description].join(" ");
  return { title, requirements, description, allText };
};

const identifyJobCategory = (jobOrResume) => {
  // Accepts either job or resume info object
  const text = jobOrResume.allText || "";
  for (const [category, data] of Object.entries(JOB_CATEGORIES)) {
    if (data.keywords.some((keyword) => text.includes(keyword))) {
      // Identify subcategory
      for (const [subCategory, skills] of Object.entries(data.subCategories)) {
        if (skills.mustHaveSkills.some((skill) => text.includes(skill))) {
          return { main: category, sub: subCategory };
        }
      }
      return { main: category, sub: null };
    }
  }
  return null;
};

const calculateTitleSimilarity = (resumeTitle, jobTitle) => {
  // Exact match
  if (resumeTitle === jobTitle) return 1;
  // Partial match
  if (jobTitle.includes(resumeTitle) || resumeTitle.includes(jobTitle))
    return 0.8;
  // Word overlap
  const words1 = new Set(resumeTitle.split(/\s+/));
  const words2 = new Set(jobTitle.split(/\s+/));
  const intersection = new Set([...words1].filter((x) => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  return union.size === 0 ? 0 : intersection.size / union.size;
};

const calculateTotalExperience = (workExperience) => {
  if (!Array.isArray(workExperience)) return 0;
  let total = 0;
  for (const exp of workExperience) {
    if (!exp.startDate) continue;
    const start = new Date(exp.startDate);
    const end = exp.endDate ? new Date(exp.endDate) : new Date();
    if (!isNaN(start) && !isNaN(end)) {
      total += (end - start) / (1000 * 60 * 60 * 24 * 365);
    }
  }
  return total;
};

const calculateExperienceMatch = (actualExp, requiredExp) => {
  if (!requiredExp) return 1; // If no experience required
  if (actualExp >= requiredExp) return 1; // Perfect match

  // Partial match based on how close the actual experience is to required
  const ratio = actualExp / requiredExp;
  // Allow some flexibility: if actual exp is at least 70% of required, give higher score
  return ratio >= 0.7 ? 0.8 : ratio;
};

// Improved matching: strict category, subcategory, must-have skills, and title
const calculateMatchScore = (job, resume) => {
  const resumeInfo = extractResumeInfo(resume);
  const jobInfo = extractJobInfo(job);
  const category = identifyJobCategory(jobInfo);
  const resumeCategory = identifyJobCategory(resumeInfo);

  // Basic category match check
  if (!category || !resumeCategory || category.main !== resumeCategory.main) {
    return 0;
  }

  // Role/title match check (40 points)
  if (!checkRoleMatch(resumeInfo.designation, jobInfo.title, category)) {
    return 0;
  }

  let score = 0;

  // Title similarity (30%)
  score += calculateTitleSimilarity(resumeInfo.designation, jobInfo.title) * 30;

  // Skills match (50%)
  const skillsScore = calculateSkillsMatch(
    resumeInfo.skills,
    jobInfo.requirements,
    category
  );
  score += skillsScore * 50;

  // Experience match (20%)
  const actualExp = calculateTotalExperience(resume.workExperience);
  const expMatch = calculateExperienceMatch(actualExp, job.experienceLevel);
  score += expMatch * 20;

  return Math.round(score);
};

const checkRoleMatch = (resumeTitle, jobTitle, category) => {
  const normalizeTitle = (title) => title.toLowerCase().replace(/[-_]/g, " ");
  const resumeNorm = normalizeTitle(resumeTitle);
  const jobNorm = normalizeTitle(jobTitle);

  // If we have a category, check against its title keywords and excludes
  if (category?.sub) {
    const subCat = JOB_CATEGORIES[category.main].subCategories[category.sub];

    // Check if job title contains excluded keywords
    if (subCat.excludeKeywords?.some((kw) => jobNorm.includes(kw))) {
      return false;
    }

    // Check if either title contains category-specific keywords
    return subCat.titleKeywords.some(
      (kw) => resumeNorm.includes(kw) || jobNorm.includes(kw)
    );
  }

  return true; // If no specific category, don't eliminate based on title
};

const calculateSkillsMatch = (resumeSkills, jobRequirements, category) => {
  const normalize = (skill) => skill.toLowerCase().trim();
  const resumeSkillSet = new Set(resumeSkills.map(normalize));
  const jobSkillSet = new Set(jobRequirements.map(normalize));

  let score = 0;
  let maxScore = 0;

  if (category?.sub) {
    const subCat = JOB_CATEGORIES[category.main].subCategories[category.sub];

    // Must-have skills (60% weight)
    const mustHaveCount = subCat.mustHaveSkills.length;
    const matchingMustHave = subCat.mustHaveSkills.filter(
      (skill) =>
        resumeSkillSet.has(normalize(skill)) ||
        [...resumeSkillSet].some((rs) => rs.includes(normalize(skill)))
    ).length;

    score += (matchingMustHave / mustHaveCount) * 60;
    maxScore += 60;

    // Common skills (20% weight)
    const commonCount = subCat.commonSkills.length;
    const matchingCommon = subCat.commonSkills.filter(
      (skill) =>
        resumeSkillSet.has(normalize(skill)) ||
        [...resumeSkillSet].some((rs) => rs.includes(normalize(skill)))
    ).length;

    score += (matchingCommon / commonCount) * 20;
    maxScore += 20;
  }

  // Job-specific requirements (20% weight)
  const matchingRequirements = [...jobSkillSet].filter((req) =>
    [...resumeSkillSet].some((rs) => rs.includes(req) || req.includes(rs))
  ).length;

  score += (matchingRequirements / jobSkillSet.size) * 20;
  maxScore += 20;

  return maxScore > 0 ? score / maxScore : 0;
};

const findMatchingJobs = async (resume) => {
  try {
    const jobs = await Job.find({
      status: "active",
      approval: "approved",
    }).populate("company");

    const resumeInfo = extractResumeInfo(resume);

    return jobs
      .map((job) => ({
        job,
        score: calculateMatchScore(job, resume),
      }))
      .filter((item) => item.score >= 40)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((item) => ({
        ...item.job.toObject(),
        matchScore: item.score,
      }));
  } catch (error) {
    console.error("Job matching error:", error);
    return [];
  }
};

// Gợi ý công việc cho resume
export const suggestJobsForResume = async (resume) => {
  try {
    const suggestedJobs = await findMatchingJobs(resume);

    const user = await User.findById(resume.userId);
    if (!user?.email) {
      console.log("No user email found");
      return;
    }

    // Simple rate limiting - once per day
    const now = new Date();
    const lastSent = user.lastJobSuggestionSentAt;
    if (lastSent && now - new Date(lastSent) < 86400000) {
      // 24 hours
      console.log("Email already sent today");
      return;
    }

    const emailHtml = buildJobSuggestionsEmail(user, suggestedJobs);
    await sendSuggestionEmail(
      user.email,
      "Việc làm phù hợp với bạn",
      emailHtml
    );

    user.lastJobSuggestionSentAt = now;
    await user.save();
  } catch (error) {
    console.error("Failed to send job suggestions:", error);
    throw error;
  }
};
