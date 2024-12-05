import cron from "node-cron";
import cryptoCoinsJob from "./jobs/cryptocoinsJob";
import overviewJob from "./jobs/overviewJob";

// cryptoCoinsJob();
// overviewJob();

//Schedule fetch latest crypto coins every 5 mins
cron.schedule("*/5 * * * *", cryptoCoinsJob);

//Schedule fetch latest overview data every 2 hours
cron.schedule("0 */2 * * *", overviewJob);
