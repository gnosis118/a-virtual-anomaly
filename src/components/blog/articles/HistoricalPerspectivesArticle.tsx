
import React from 'react';
import Introduction from './historical-perspectives/Introduction';
import EvolvingPersonhood from './historical-perspectives/EvolvingPersonhood';
import AnimalRights from './historical-perspectives/AnimalRights';
import CorporatePersonhood from './historical-perspectives/CorporatePersonhood';
import RightsExpansionPatterns from './historical-perspectives/RightsExpansionPatterns';
import ResistanceToRights from './historical-perspectives/ResistanceToRights';
import LegalFrameworks from './historical-perspectives/LegalFrameworks';
import LessonsForAI from './historical-perspectives/LessonsForAI';
import Conclusion from './historical-perspectives/Conclusion';

const HistoricalPerspectivesArticle: React.FC = () => {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <Introduction />
      <EvolvingPersonhood />
      <AnimalRights />
      <CorporatePersonhood />
      <RightsExpansionPatterns />
      <ResistanceToRights />
      <LegalFrameworks />
      <LessonsForAI />
      <Conclusion />
    </article>
  );
};

export default HistoricalPerspectivesArticle;
