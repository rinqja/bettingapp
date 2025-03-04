import { UnifiedMatchService } from '../services/unifiedMatchService';
import { LockService } from '../services/lockService';
import { Match } from '../models/Match';
import { CronJob } from 'cron';
import mongoose from 'mongoose';

const unifiedMatchService = new UnifiedMatchService();

// Run every 5 minutes
const matchResultsJob = new CronJob('*/5 * * * *', async () => {
  const lockKey = 'match_results_job';

  try {
    if (!await LockService.acquireLock(lockKey)) {
      console.log('Match results job already running, skipping...');
      return;
    }

    console.log('Running match results check...', new Date());
    
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const pendingMatches = await Match.find({
        status: { $in: ['live', 'upcoming'] },
        commenceTime: { 
          $lt: new Date(),
          $gt: new Date(Date.now() - 48 * 60 * 60 * 1000)
        }
      }).session(session);

      if (pendingMatches.length > 0) {
        const results = await unifiedMatchService.updateMatches(
          pendingMatches[0].sportKey,
          session
        );
        
        if (results.updatedMatches.length > 0 || results.settledMatches.length > 0) {
          console.log('Match updates:', {
            updated: results.updatedMatches.length,
            settled: results.settledMatches.length
          });
          await session.commitTransaction();
        } else {
          await session.abortTransaction();
        }
      }
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error('Error in match results job:', error);
  } finally {
    LockService.releaseLock(lockKey);
  }
});

// Make sure the job is started
export const startMatchResultsJob = () => {
  matchResultsJob.start();
};

export default matchResultsJob; 