export const ghRequest = (path: string): Promise<unknown> => fetch(`https://api.github.com/${path}`).then(r => r.json());
export const ghContent = (path: string): Promise<Response> => fetch(`https://raw.githubusercontent.com/TwoIdiotsLearning/${path}`)
export const ghTextContent = (path: string): Promise<string> => ghContent(path).then(r => r.text());
export const ghJsonContent = (path: string): Promise<unknown> => ghContent(path).then(r => r.json());