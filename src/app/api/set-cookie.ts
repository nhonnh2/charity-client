

export async function POST(request: Request) {

    const res = await request.json();

    const sessionToken=res.payload?.data?.token;

    return Response.json({}, {
        status: 200,
        headers: {
          'Set-Cookie': `sessionToken=${sessionToken.value}; Path=/; HttpOnly;SameSite=Lax; Secure`
        }
      })
}