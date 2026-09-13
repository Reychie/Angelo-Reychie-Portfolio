export const blackHoleVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const blackHoleFragment = /* glsl */ `
precision mediump float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uCenter;
uniform float uQuality;
uniform float uMotion;

varying vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = noise(p);
  v += 0.5 * noise(p * 2.07);
  if (uQuality > 0.5) {
    v += 0.25 * noise(p * 4.13);
  }
  return v / 1.75;
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 uv = (vUv - uCenter) * vec2(aspect, 1.0);

  float t = uTime * 0.12 * uMotion;

  float r = length(uv);
  vec2 dir = uv / max(r, 0.0001);
  float bend = 0.075 / (r + 0.085);
  vec2 luv = uv + dir * bend * mix(0.25, 1.0, uMotion);
  float lens = exp(-pow((r - 0.19) * 9.0, 2.0));
  luv += dir * lens * 0.018 * uMotion;

  float n = noise(luv * 2.35 + vec2(t * 0.32, -t * 0.2));
  if (uQuality > 0.45) {
    n = mix(n, fbm(luv * 2.05 + t * 0.14), 0.62);
  }

  vec2 wuv = luv + luv * (n - 0.5) * 0.04 * uMotion;
  float wr = length(wuv);

  vec2 duv = vec2(wuv.x, wuv.y * 1.42);
  float dr = length(duv);

  vec3 purpleDeep = vec3(0.302, 0.098, 0.847);
  vec3 purple = vec3(0.455, 0.235, 1.0);
  vec3 violet = vec3(0.608, 0.427, 1.0);
  vec3 blue = vec3(0.286, 0.486, 1.0);
  vec3 innerDisk = vec3(0.847, 0.769, 1.0);
  vec3 whiteHot = vec3(1.0, 0.980, 1.0);

  vec3 color = vec3(0.008, 0.008, 0.02);

  if (uQuality > 0.3) {
    vec2 starScale = vec2(92.0, 58.0);
    vec2 gid = floor(vUv * starScale);
    vec2 gv = fract(vUv * starScale) - 0.5;
    float hs = hash(gid);
    float keep = step(0.988, hs);
    float rad = 0.07 + 0.1 * hash(gid + 4.7);
    float star = keep * (1.0 - smoothstep(0.0, rad, length(gv)));
    star *= 0.7 + 0.3 * sin(uTime * 0.5 + hs * 38.0);
    star *= smoothstep(0.2, 0.5, wr);
    color += vec3(0.86, 0.88, 1.0) * star * 0.7;
  }

  float atmos = exp(-pow(wr * 1.28, 2.0));
  color += mix(purpleDeep, blue, 0.32) * atmos * 0.4;

  float halo = exp(-pow((wr - 0.24) * 3.05, 2.0));
  color += purple * halo * 0.42;

  float disk = exp(-pow((dr - 0.275) * 15.5, 2.0));
  float diskMask = smoothstep(0.145, 0.22, dr) * (1.0 - smoothstep(0.42, 0.57, dr));
  float equator = 0.38 + 0.62 * exp(-pow(wuv.y * 11.2, 2.0));
  float ang = atan(wuv.y, wuv.x);
  float wave = sin(ang * 9.0 - t * 1.2 + dr * 18.0 + n * 3.1);
  float dopplerSide = clamp(wuv.x / max(dr, 0.001), -1.0, 1.0);
  float doppler = pow(0.72 + 0.28 * (dopplerSide * 0.5 + 0.5), 1.35);
  float turbulence = 0.82 + 0.18 * sin(ang * 17.0 - t * 2.2 + n * 8.0);

  vec3 diskCol = mix(purple, violet, wave * 0.5 + 0.5);
  diskCol = mix(diskCol, innerDisk, disk * 0.52);
  diskCol = mix(diskCol, whiteHot, pow(disk, 1.35) * 0.48);
  color += diskCol * disk * diskMask * equator * doppler * turbulence * 1.7;

  float outer = exp(-pow((dr - 0.39) * 8.2, 2.0)) * 0.42;
  color += mix(purpleDeep, blue, 0.38) * outer * equator;

  float flare = exp(-pow(wuv.y * 22.0, 2.0)) * exp(-pow(wuv.x * 2.15, 2.0));
  float flareHot = exp(-pow(wuv.y * 52.0, 2.0)) * exp(-pow(wuv.x * 5.1, 2.0));
  color += mix(purple, violet, 0.45) * flare * 0.42;
  color += whiteHot * flareHot * 0.55;

  float ring = exp(-pow((wr - 0.148) * 48.0, 2.0));
  color += mix(innerDisk, whiteHot, 0.78) * ring * 1.25;

  float innerGlow = exp(-pow((wr - 0.172) * 13.5, 2.0));
  color += mix(purple, whiteHot, 0.32) * innerGlow * 0.5;

  float hole = 1.0 - smoothstep(0.098, 0.142, wr);
  color *= 1.0 - hole * 0.985;

  float vig = smoothstep(1.32, 0.38, length((vUv - 0.5) * 1.12));
  color *= mix(0.84, 1.0, vig);

  gl_FragColor = vec4(color, 1.0);
}
`;
