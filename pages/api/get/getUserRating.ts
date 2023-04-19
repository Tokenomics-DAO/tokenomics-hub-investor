import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
    const { authorClerkId, postId } = req.body;

    const userStrengthRating = await prisma.userStrengthRating.findFirst({
        where: {
            authorClerkId: authorClerkId,
            postId: postId,
        },
    }) || {
        id: '',
        userReviewUtility: '',
        userReviewDemandDriver: '',
        userReviewValueCreation: '',
        userReviewValueCapture: '',
        userReviewBusinessModel: '',
        tokenUtilityStrength: 0,
        businessModelStrength: 0,
        valueCreationStrength: 0,
        valueCaptureStrength: 0,
        demandDriversStrength: 0,
    }

    return res.status(200).send(userStrengthRating || {})
}