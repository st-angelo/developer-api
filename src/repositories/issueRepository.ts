import db from '../db/db';
import IssueXRoute from '../entities/issueXRoute';

const getIssuesXRoute = (route: string) =>
  db.data.issueXRoutes.filter(issueXRoute => issueXRoute.route === route) || [];

const getIssueXRoute = (issueKey: string, route: string) =>
  db.data.issueXRoutes.find(
    issueXRoute =>
      issueXRoute.route === route && issueXRoute.issueKey === issueKey
  );

const existsIssueXRoute = (issueKey: string, route: string) =>
  db.data.issueXRoutes.some(
    issueXRoute =>
      issueXRoute.route === route && issueXRoute.issueKey === issueKey
  );

const addIssueXRoute = async (issueKey: string, route: string) => {
  const issueXRoute = new IssueXRoute(issueKey, route);
  db.data.issueXRoutes.push(issueXRoute);
  await db.write();
  return issueXRoute;
};

const deleteIssueXRoute = async (issueKey: string, route: string) => {
  const toDeleteIdx = db.data.issueXRoutes.findIndex(
    issueXRoute =>
      issueXRoute.issueKey === issueKey && issueXRoute.route === route
  );
  if (toDeleteIdx === -1) return false;
  db.data.issueXRoutes.splice(toDeleteIdx, 1);
  await db.write();
  return true;
};

const deleteIssueForAllRoutes = async (issueKey: string) => {
  db.data.issueXRoutes = db.data.issueXRoutes.filter(
    issueXRoute => issueXRoute.issueKey !== issueKey
  );
  await db.write();
};

export default {
  getIssuesXRoute,
  getIssueXRoute,
  existsIssueXRoute,
  addIssueXRoute,
  deleteIssueXRoute,
  deleteIssueForAllRoutes,
};
