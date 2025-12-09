varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

uniform float uNightBrightness;
uniform sampler2D uTexture;
uniform float uExposure;

vec3 bw(vec3 color) {

    float v = color.r * 0.2126 + color.g * 0.7152 + color.b * 0.072;
    return vec3(v, v, v);
}
vec3 nightify(vec3 color) {

    vec3 bwColor = bw(color);
    float saturation = 0.9;

    vec3 washedOutColor = mix(bwColor, color, saturation);
    float brightness = uNightBrightness;

    return washedOutColor * brightness;
}

void main() {

    float k = 1. - max(0., dot((viewMatrix * vec4(vNormal.xyz, 0.)).xyz, vec3(0.0, 0.0, 1.0)));

    vec3 dayColor = texture(uTexture, vUv).rgb;
    dayColor = pow(pow(dayColor, vec3(2., 2., 2.)) * 0.4, vec3(0.5, 0.5, 0.5));
    vec3 nightColor = nightify(dayColor);

    float d = -dot(vNormal, normalize(vPosition));
    float b = max(d, 0.);

    vec3 color = mix(nightColor, dayColor, b) + vec3(1., 1., 1.) * pow(k, 8.) * 0.3;
    color = max(vec3(0., 0., 0.), color - (1. - uExposure) * vec3(1., 1., 1.));

    gl_FragColor = vec4(color, 1.0);
}