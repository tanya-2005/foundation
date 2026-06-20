export interface BeneficiaryStory {
  id: string;
  name: string;
  age: number;
  location: string;
  storyBefore: string;
  storyAfter: string;
  imageBefore: string;
  imageAfter: string;
  category: string;
}

export interface Initiative {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: string; // matches lucide icons
  impactGoal: string;
  beneficiariesCount: string;
  color: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  impactIcon: string;
}

export interface VolunteerSubmission {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  interest: string;
  message: string;
  skills: string;
  availability: string;
  preferredContact: string;
}

export interface LiveStateImpact {
  id: string;
  stateName: string;
  paths: string[]; // SVG paths
  activeProjects: number;
  livesImpacted: string;
  volunteersCount: number;
  highlightStory: string;
  centerCoordinates: { x: number; y: number };
}

export interface NGOEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  slotsLeft: number;
  category: "Education" | "Health" | "Environment" | "Upliftment";
}
