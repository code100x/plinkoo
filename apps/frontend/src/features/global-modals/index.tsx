import React from 'react';
import { GLOBAL_MODAL } from './types';
import BetModal from './bet-modal';
import { fairnessModalSearchSchema, Route } from '@/routes/__root';
import { betModalSearchSchema } from '../../routes/__root';
import { z } from 'zod';
import { FairnessModal } from '../games/common/components/fairness-modal';

const GlobalModals = () => {
  const search = Route.useSearch();
  return (
    <>
      <BetModal
        iid={(search as z.infer<typeof betModalSearchSchema>)?.iid}
        modal={search?.modal}
      />
      <FairnessModal
        game={(search as z.infer<typeof fairnessModalSearchSchema>)?.game}
        show={search?.modal === GLOBAL_MODAL.FAIRNESS}
        tab={
          (search as z.infer<typeof fairnessModalSearchSchema>)?.tab || 'seeds'
        }
      />
    </>
  );
};

export default GlobalModals;
