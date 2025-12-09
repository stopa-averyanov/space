varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

uniform float uTime;
uniform sampler2D uTextureDay;
uniform sampler2D uTextureNight;
uniform sampler2D uTextureClouds;
uniform sampler2D uTextureSpecular;
uniform vec3 uCameraPosition;
uniform float uExposure;

vec3 bw(vec3 color) {

    float v = color.r * 0.2126 + color.g * 0.7152 + color.b * 0.072;
    return vec3(v, v, v);
}
vec3 nightify(vec3 color) {

    vec3 bwColor = bw(color);
    float saturation = 0.9;

    vec3 washedOutColor = mix(bwColor, color, saturation);
    vec3 tint = vec3(0.48, 0.54, 1.);
    float tintStrength = 0.6;
    // float brightness = 0.17;
    float brightness = 0.08;

    return washedOutColor * mix(vec3(1., 1., 1.), tint, tintStrength) * brightness;
}

void main() {

    float k = 1. - max(0., dot((viewMatrix * vec4(vNormal.xyz, 0.)).xyz, vec3(0.0, 0.0, 1.0)));

    float clouds = texture(uTextureClouds, vUv - vec2(uTime * 0.005, 0.)).r;
    clouds = pow(clouds, 1.5);

    vec3 skyBlue = vec3(0.26, 0.4, 0.71);    

    vec3 dayColor = texture(uTextureDay, vUv).rgb;
    dayColor = pow(pow(dayColor, vec3(2., 2., 2.)) * 0.5, vec3(0.5, 0.5, 0.5));
    vec3 lights = texture(uTextureNight, vUv).rgb;
    vec3 nightColor = nightify(dayColor + vec3(1., 1., 1.) * clouds);
    nightColor = pow(pow(nightColor, vec3(2., 2., 2.)) * 0.5, vec3(0.5, 0.5, 0.5));

    vec3 color = texture(uTextureDay, vUv).rgb;

    float d = -dot(vNormal, normalize(vPosition));
    float b = max(0., d);
    float l = pow(max(0., dot(vNormal, normalize(vPosition)) * 0.9 + 0.1), 0.7);

    dayColor = dayColor + vec3(1., 1., 1.) * clouds;

    color = mix(nightColor, dayColor, b);

    color = color + lights * vec3(1., 0.9, 0.6) * l;

    color = color + vec3(1., 1., 1.) * pow(k, 8.) * 0.3 + skyBlue * max(0., b * pow(k, 2.) * 0.7);
    color = min(vec3(1., 1., 1.), color);
    color = max(vec3(0., 0., 0.), color - (1. - uExposure) * vec3(1., 1., 1.));
    
    gl_FragColor = vec4(color, 1.0);
}