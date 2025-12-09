varying vec2 vUv;
uniform float uExposure;

uniform sampler2D uTexture;

void main() {

    float p = texture(uTexture, vUv).x;

    p = pow(p, 1.4);
    p = p * 1.3;
    p = p - (1. - uExposure) * 2.;
    p = max(0., p);

    gl_FragColor = vec4(p, p, p, 1.0);
}