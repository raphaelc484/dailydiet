import { makeUpdateMealUseCase } from '@/use-cases/factories/make-update-meal-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateMeal(request: FastifyRequest, reply: FastifyReply) {
  const updateMealParamsSchema = z.object({
    meal_id: z.string().uuid(),
  })

  const updateMealBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    date_set: z.string().optional(),
    on_or_off_diet: z.boolean().optional(),
  })

  const { meal_id } = updateMealParamsSchema.parse(request.params)

  const { name, description, date_set, on_or_off_diet } =
    updateMealBodySchema.parse(request.body)

  const updateMealUseCase = makeUpdateMealUseCase()

  const meal = await updateMealUseCase.execute({
    meal_id,
    name,
    description,
    date_set,
    on_or_off_diet,
  })

  return reply.status(200).send(meal)
}
