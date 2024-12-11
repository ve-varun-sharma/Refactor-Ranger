import { Probot } from 'probot';
import { generateAiResponse } from './helpers/gemini.helpers';

export default (app: Probot) => {
    app.log.info('Refactor Ranger at your service!');

    app.on(['issues.opened', 'pull_request.opened'], async (context) => {
        if (context.name === 'issues') {
            const contextBody = context.payload.issue.body;

            const aiResponse = await generateAiResponse(contextBody as string);

            const issueComment = context.issue({
                body: aiResponse
            });
            await context.octokit.issues.createComment(issueComment);
        }
    });
};
