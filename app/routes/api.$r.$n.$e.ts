import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";

interface RevenueData {
  referredCustomersPerMonth: number;
  avgNewProjectsPerMonth: number;
  avgExistingProjects: number;
  churnRate: number;
  months: number;
}
function calculateAffiliateRevenue({
  referredCustomersPerMonth,
  avgNewProjectsPerMonth,
  avgExistingProjects,
  churnRate,
  months
}: RevenueData) {
  const newProjectFee = 95;
    const existingProjectFee = 0.25;
    const affiliateCommissionRate = 0.20;

    let totalReferredCustomers = 0;
    let totalAffiliatePayout = 0;
    let totalRevenue = 0;

    let activeReferredCustomers = 0; // Number of active referred customers at the start of each month

    // Arrays to track revenue and payout for each month
    let monthlyPayoutArray = [];

    // Get current date to generate month labels
    const today = new Date();

    for (let month = 0; month <= months; month++) {
        // Update the number of active referred customers considering churn rate
        activeReferredCustomers = (activeReferredCustomers * (1 - churnRate)) + referredCustomersPerMonth;
        totalReferredCustomers += referredCustomersPerMonth;

        // Calculate the total revenue and payout for all active referred customers this month
        let monthlyRevenue = 0;
        let monthlyPayout = 0;

        for (let i = 0; i < activeReferredCustomers; i++) {
            let newProjects = avgNewProjectsPerMonth;
            let existingProjects = avgExistingProjects + (month - 1) * avgNewProjectsPerMonth;

            let customerRevenue = (newProjects * newProjectFee) + (existingProjects * existingProjectFee);
            monthlyRevenue += customerRevenue;
            monthlyPayout += customerRevenue * affiliateCommissionRate;
        }

        // Generate the month label
        const monthDate = new Date(today.getFullYear(), today.getMonth() + month - 1);
        let monthLabel = monthDate.toLocaleString('default', { month: 'long' });

        // Add the year to the label if it's the current month or when the year changes
        if (month === 1 || monthDate.getMonth() === 0) {
            monthLabel += ` ${monthDate.getFullYear()}`;
        }

        // Store monthly results
        monthlyPayoutArray.push({
            month: monthLabel,
            payout: parseFloat(monthlyPayout.toFixed(2)),
        });

        totalRevenue += monthlyRevenue;
        totalAffiliatePayout += monthlyPayout;
    }

    return {
        totalReferredCustomers,
        totalRevenue,
        totalAffiliatePayout,
        monthlyPayoutArray
    };
}

export const action = async ({ params }: ActionFunctionArgs) => {
  const revenueData: RevenueData = {
    referredCustomersPerMonth: Number(params.r),
    avgNewProjectsPerMonth: Number(params.n),
    avgExistingProjects: Number(params.e),
    churnRate: 0.2,
    months : 13
  };
  const result = calculateAffiliateRevenue(revenueData);
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
