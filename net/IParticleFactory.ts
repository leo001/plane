interface IParticleFactory{
    getParticle(name_t: string, name_c: string): particle.ParticleSystem;
}
