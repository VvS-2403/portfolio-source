export type RetrievalIntent =
  | 'project'
  | 'technical'
  | 'skill'
  | 'research'
  | 'career'
  | 'personal'
  | 'comparison'
  | 'education'
  | 'extracurricular'
  | 'unknown';

export type RetrievalStrategy =
  | 'direct_lookup'
  | 'semantic_discovery'
  | 'graph_traversal'
  | 'hybrid';

export type RetrievalMode =
  | 'exploration'
  | 'deep_dive'
  | 'comparison'
  | 'career'
  | 'research';

export interface GraphEntity {
  id: string;
  type: string;
  title: string;
  summary?: string;
  metadata: Record<string, unknown>;
}

export interface GraphRelationship {
  sourceId: string;
  targetId: string;
  relationship: string;
  weight: number;
}

export interface DocumentSection {
  id: number;
  entityId: string;
  sectionType: string;
  content: string;
  metadata: Record<string, unknown>;
  similarity?: number;
}

export interface ContextPackage {
  question: string;
  intent: RetrievalIntent;
  strategy: RetrievalStrategy;
  mode: RetrievalMode;
  confidence: number;

  primaryEntities: GraphEntity[];
  relatedEntities: GraphEntity[];
  documentSections: DocumentSection[];

  activeProject?: string;
  activeTopic?: string;
  visitedEntities: string[];

  contextText: string;
  fallback: boolean;
}
