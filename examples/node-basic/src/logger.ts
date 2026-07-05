/**
 * A simple console logger helper for formatting CLI stages.
 */
export const Logger = {
  /**
   * Log a general step separator and description.
   */
  step(title: string): void {
    console.log('\n' + '='.repeat(50));
    console.log(`🔷 STEP: ${title}`);
    console.log('='.repeat(50));
  },

  /**
   * Log an informational message.
   */
  info(message: string): void {
    console.log(`ℹ️  [INFO] ${message}`);
  },

  /**
   * Log a successful operation result.
   */
  success(message: string): void {
    console.log(`✅ [SUCCESS] ${message}`);
  },

  /**
   * Log an error or failure indicator.
   */
  error(message: string, error?: any): void {
    console.error(`❌ [ERROR] ${message}`);
    if (error) {
      if (error instanceof Error) {
        console.error(`   Message: ${error.message}`);
        if (process.env.DEBUG === 'true' && error.stack) {
          console.error(`   Stack: ${error.stack}`);
        }
      } else {
        console.error(`   Details:`, error);
      }
    }
  },
};
