import { makeMetricsUseCase } from '@/use-cases/factories/make-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const metricsUseCase = makeMetricsUseCase()

  const metrics = await metricsUseCase.execute(request.user.sub)

  return reply.status(200).send(metrics)
}
