export type Page = 
  | 'home' 
  | 'about' 
  | 'leader' 
  | 'news' 
  | 'events' 
  | 'gallery' 
  | 'projects' 
  | 'manifesto' 
  | 'join' 
  | 'volunteer' 
  | 'donate' 
  | 'media' 
  | 'contact' 
  | 'admin'
  | 'member-portal';

export interface AdminCredentials {
  username: string;
  passwordHash?: string;
  password?: string;
  lastUpdated?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'Press Releases' | 'Events' | 'Development Projects' | 'Political Activities' | 'Announcements';
  summary: string;
  content: string;
  date: string;
  author: string;
  imageUrl: string;
  tags: string[];
  views: number;
}

export interface EventItem {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  venue: string;
  description: string;
  imageUrl: string;
  registeredCount: number;
  lat: number;
  lng: number;
  isUpcoming: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Rallies' | 'Speeches' | 'Development' | 'Youth' | 'Culture';
  imageUrl: string;
  caption: string;
  date: string;
}

export interface DevelopmentProject {
  id: string;
  title: string;
  category: 'Roads' | 'Education' | 'Health' | 'Youth' | 'Women' | 'Tourism' | 'Water' | 'Infrastructure';
  status: 'Completed' | 'Ongoing' | 'Planned';
  progress: number; // 0 to 100
  budget: string;
  location: string;
  summary: string;
  details: string;
  imageUrl: string;
  completionYear: string;
}

export interface ManifestoPillar {
  id: string;
  title: string;
  iconName: string;
  summary: string;
  keyPoints: string[];
  color: string;
}

export interface MemberRecord {
  id: string;
  membershipNo: string;
  fullName: string;
  fatherName: string;
  cnic: string;
  gender: string;
  dob: string;
  mobile: string;
  email: string;
  username?: string;
  password?: string;
  village: string;
  tehsil: string;
  district: string;
  occupation: string;
  joinedDate: string;
  status: 'Active' | 'Pending' | 'Verified';
  photoUrl?: string;
  bio?: string;
}

export interface VolunteerRecord {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  username?: string;
  password?: string;
  village: string;
  preferredRole: string;
  availability: string;
  status: 'Pending' | 'Approved';
  registeredDate: string;
  photoUrl?: string;
}

export interface MemberPost {
  id: string;
  memberId: string;
  memberName: string;
  memberUsername: string;
  memberRole?: 'Member' | 'Volunteer' | string;
  title: string;
  category: 'Press Releases' | 'Events' | 'Development Projects' | 'Political Activities' | 'Announcements';
  summary: string;
  content: string;
  imageUrl?: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  rejectionReason?: string;
  // Compatibility aliases
  authorName?: string;
  authorUsername?: string;
  authorRole?: string;
  submittedAt?: string;
  adminFeedback?: string;
}

export interface MediaHeadMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderUsername: string;
  senderRole: 'Member' | 'Volunteer' | string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
  status: 'Received' | 'Reviewed' | 'Replied' | string;
  reply?: string;
  repliedDate?: string;
  // Compatibility aliases
  sentAt?: string;
  repliedAt?: string;
}

export interface DonationRecord {
  id: string;
  donorName: string;
  amount: number;
  paymentMethod: 'Raast' | 'Bank Transfer' | 'EasyPaisa' | 'JazzCash';
  transactionId: string;
  date: string;
  campaign: string;
  isAnonymous: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  village: string;
  date: string;
  isRead: boolean;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
