/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { Logger } from "@nhcarrigan/logger";

export const logger = new Logger(
  "Sakura",
  process.env.ALERT_TOKEN as string
);
