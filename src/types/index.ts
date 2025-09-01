export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  userId: string;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
  lifestyle?: LifestyleData;
}

export type ProjectStatus = 
  | 'ONBOARDING'
  | 'PHASE1_IN_PROGRESS'
  | 'PENDING_ADMIN_REVIEW'
  | 'PHASE2_PUBLISHED'
  | 'PHASE2_FEEDBACK_COMPLETE'
  | 'PHASE3_PUBLISHED'
  | 'PHASE3_REVISION_PENDING'
  | 'PROJECT_COMPLETE';

export interface LifestyleData {
  budgetRange?: string;
  appliancePreferences?: string[];
  familyLifestyle?: string[];
  styleIndicators?: string[];
}

export interface Space {
  id: string;
  name: string;
  order: number;
  isActive: boolean;
}

export interface Board {
  id: string;
  spaceId: string;
  name: string;
  order: number;
  images: BoardImage[];
}

export interface BoardImage {
  id: string;
  url: string;
  alt: string;
  tags: string[];
}

export interface UserSelection {
  id: string;
  projectId: string;
  spaceId: string;
  boardId: string;
  imageId: string;
  likedTags: string[];
  dislikedTags: string[];
  comment?: string;
  voiceNoteUrl?: string;
  createdAt: Date;
}

export interface SpaceRanking {
  id: string;
  projectId: string;
  spaceId: string;
  rankedImageIds: string[];
  createdAt: Date;
}

export interface UploadedImage {
  id: string;
  projectId: string;
  spaceId: string;
  url: string;
  filename: string;
  tags: string[];
  comment?: string;
  voiceNoteUrl?: string;
  createdAt: Date;
}

export interface DesignDossier {
  id: string;
  projectId: string;
  sections: DossierSection[];
  isSubmitted: boolean;
  regenerationCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DossierSection {
  id: string;
  title: string;
  content: string;
  order: number;
  type: 'summary' | 'budget' | 'style' | 'moodboard' | 'favorites' | 'space' | 'inspiration' | 'tags';
}

export interface ConceptImage {
  id: string;
  projectId: string;
  spaceId: string;
  url: string;
  alt: string;
  tags: string[];
  phase: 2 | 3;
  isPublished: boolean;
  isDraft: boolean;
  generatedPrompt?: string;
  createdAt: Date;
}

export interface ImageFeedback {
  id: string;
  projectId: string;
  imageId: string;
  rating: 'love' | 'like' | 'not_a_fan' | 'approved';
  likedTags: string[];
  dislikedTags: string[];
  comment?: string;
  voiceNoteUrl?: string;
  createdAt: Date;
}

export interface AppContextType {
  currentUser: User | null;
  currentProject: Project | null;
  setCurrentUser: (user: User | null) => void;
  setCurrentProject: (project: Project | null) => void;
}