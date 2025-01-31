import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) { 
  try {
    const formData = await request.formData();
    
    const code = formData.get("code") as string;
    const scope = formData.get("scope") as string;
    const state = formData.get("state") as string;

    const codeStr = code ? "code="+code+"&" : "";
    const scopeStr = scope ? "scope="+scope+"&" : "";
    const stateStr = state ? "state="+state+"&" : "";
    
    const originalUrl = request.nextUrl.protocol + request.headers.get('host') + request.nextUrl.pathname;
    const loginUrl = new URL('/login/apple', originalUrl);

    loginUrl.searchParams.set('code', code)
    loginUrl.searchParams.set('scope', scope)
    loginUrl.searchParams.set('state', state)

    return NextResponse.redirect(loginUrl, { status: 303 })
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: 500, statusText: "Bad Request" });
  }
}
