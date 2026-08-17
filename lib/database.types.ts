export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string;
          name: string;
          tenant_id: string | null;
          legal_name: string | null;
          code: string | null;
          base_currency: string | null;
          timezone: string | null;
          status: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          tenant_id?: string | null;
          legal_name?: string | null;
          code?: string | null;
          base_currency?: string | null;
          timezone?: string | null;
          status?: string | null;
          updated_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["companies"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_my_workspaces: {
        Args: Record<PropertyKey, never>;
        Returns: {
          tenant_id: string;
          company_id: string;
          company_name: string;
          role: string;
          is_default: boolean;
        }[];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
