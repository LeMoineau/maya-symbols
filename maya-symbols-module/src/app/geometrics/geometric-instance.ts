export abstract class GeometricInstance {
  public abstract isEqualTo(instance: GeometricInstance): boolean;
  public abstract toString(): string;
}
