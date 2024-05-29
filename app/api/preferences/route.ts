import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/db';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            const preferences = await prisma.userPreferences.findMany();
            res.status(200).json(preferences);
            break;
        case 'POST':
            const { userId, languages, importance, location, easily_distracted, study_methods, special_attention, time_goal, reasons, pronouns, identity } = req.body;
            const newPreferences = {
                userId,
                languages,
                importance,
                location,
                easily_distracted,
                study_methods,
                special_attention,
                time_goal,
                reasons,
                pronouns,
                identity
            };
            const createdPreferences = await prisma.userPreferences.create({ data: newPreferences });
            res.status(201).json(createdPreferences);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}