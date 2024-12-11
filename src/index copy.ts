import { Probot } from 'probot';

export default (app: Probot) => {
    app.log.info('Refactor Ranger at your service!');

    // app.on(['issues.opened', 'pull_request.opened'], async (context) => {
    //     if (context.payload.action === 'opened') {
    //         const issueComment = context.issue({
    //             body: 'Thanks for opening this issue!'
    //         });
    //         await context.octokit.issues.createComment(issueComment);
    //     }

    //     const pullRequestComment = context.issue({
    //         body: 'Thanks for opening this pull request!'
    //     });
    //     await context.octokit.issues.createComment(pullRequestComment);
    // });

    app.on('pull_request.opened', async (context) => {
        app.log.info(context);

        const pullRequestComment = context.issue({
            body: 'Thanks for opening this pull request!'
        });
        const response = await context.octokit.issues.createComment(pullRequestComment);
        app.log.info(response);
    });

    // app.on('pull_request.opened', async (context) => {
    //     const { owner, repo } = context.repo();
    //     const pull_number = context.payload.pull_request.number;
    //     const body = 'Thanks for opening this pull request!';

    //     const response = await context.octokit.pulls.createReview({
    //         owner,
    //         repo,
    //         pull_number,
    //         event: 'COMMENT',
    //         body
    //     });

    //     app.log.info(response);
    // });

    // For more information on building apps:
    // https://probot.github.io/docs/

    // To get your app running against GitHub, see:
    // https://probot.github.io/docs/development/
};
