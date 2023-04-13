import { makeCreateMealUseCase } from '@/use-cases/factories/make-create-meal-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    date_set: z.string(),
    on_or_off_diet: z.boolean(),
  })

  const { name, description, date_set, on_or_off_diet } =
    createMealBodySchema.parse(request.body)

  const createMealUseCase = makeCreateMealUseCase()

  await createMealUseCase.execute({
    user_id: request.user.sub,
    name,
    description,
    date_set: new Date(date_set),
    on_or_off_diet,
  })

  return reply.status(200).send()
}
