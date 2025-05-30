
export type ContributionStatus = 'pending' | 'approved' | 'rejected';

export type Contribution = {
  id: string;
  title: string;
  content: string;
  status: ContributionStatus;
  created_at: string;
  user_id: string;
  donation_type?: string;
  amount?: string;
  is_premium?: boolean;
};
